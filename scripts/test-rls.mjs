/**
 * RLS Security Verification Script for Bhawani Secondary School
 * 
 * Verifies the Row Level Security (RLS) policies defined in supabase/schema.sql:
 * 1. Anonymous read on news_posts (only is_published = true returned)
 * 2. Anonymous write on news_posts (MUST FAIL)
 * 3. Anonymous insert on contact_messages (MUST SUCCEED)
 * 4. Anonymous select on contact_messages (MUST FAIL / RETURN NO ROWS)
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function runRLSTests() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('placeholder')) {
    console.log('ℹ️  Skipping live RLS test: Live Supabase credentials not yet provided in .env.local');
    console.log('   Schema with RLS policies is ready in supabase/schema.sql.');
    return;
  }

  console.log('🔒 Testing Supabase Row Level Security (RLS)...');
  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Test 1: Anonymous Write Rejection to news_posts
  console.log('Test 1: Anonymous write attempt to news_posts...');
  const { data: insertData, error: insertError } = await anonClient
    .from('news_posts')
    .insert([
      {
        title: 'Unauthorized Test Post',
        slug: 'unauthorized-test-post',
        body: 'This should be blocked by RLS.',
        is_published: true,
      },
    ]);

  if (insertError) {
    console.log('✅ PASS: Anonymous write was correctly blocked by RLS:', insertError.message);
  } else {
    console.error('❌ FAIL: Anonymous write succeeded! Check news_posts INSERT policy.');
  }

  // Test 2: Anonymous Read of Published news_posts
  console.log('\nTest 2: Anonymous read of published news_posts...');
  const { data: readData, error: readError } = await anonClient
    .from('news_posts')
    .select('id, title, is_published')
    .limit(5);

  if (!readError) {
    const invalidUnpublished = readData?.filter((p) => !p.is_published);
    if (invalidUnpublished?.length === 0) {
      console.log('✅ PASS: Anonymous read only returned published posts (or empty).');
    } else {
      console.error('❌ FAIL: Unpublished posts leaked to anonymous read!');
    }
  } else {
    console.log('ℹ️  Read query response:', readError.message);
  }

  // Test 3: Anonymous Contact Form submission
  console.log('\nTest 3: Anonymous submit to contact_messages...');
  const { error: contactInsertError } = await anonClient
    .from('contact_messages')
    .insert([
      {
        name: 'Automated Test Visitor',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is an automated test message for RLS policy.',
      },
    ]);

  if (!contactInsertError) {
    console.log('✅ PASS: Contact form submission accepted by public INSERT policy.');
  } else {
    console.error('❌ FAIL: Contact submission failed:', contactInsertError.message);
  }

  // Test 4: Anonymous Read of contact_messages (Must be blocked)
  console.log('\nTest 4: Anonymous read attempt on contact_messages...');
  const { data: msgData, error: msgError } = await anonClient
    .from('contact_messages')
    .select('*');

  if (msgError || !msgData || msgData.length === 0) {
    console.log('✅ PASS: Anonymous read on contact_messages blocked / returned no data.');
  } else {
    console.error('❌ FAIL: Private contact inquiries exposed to anonymous read!');
  }
}

runRLSTests();
