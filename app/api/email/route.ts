import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const emails = await sql`SELECT * FROM Emails;`;
  return NextResponse.json({ data: emails.rows }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    await sql`CREATE TABLE IF NOT EXISTS Emails (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE
    );`;

    const existingEmails = await sql`SELECT * FROM Emails WHERE email = ${email};`;
    if (existingEmails.rows.length > 0) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    await sql`INSERT INTO Emails (email) VALUES (${email});`;

    const allEmails = await sql`SELECT * FROM Emails;`;
    return NextResponse.json({ emails: allEmails.rows }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('duplicate key value violates unique constraint')) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
