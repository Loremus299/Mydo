"use server";
import { createClient } from "redis";

const redis = await createClient({ url: process.env.MYDO_REDIS_URL }).connect();

export async function POST() {
  const currentValue = await redis.get("MydoCounter");
  const num = parseInt(currentValue!);
  await redis.set("MydoCounter", num + 1);
}

export async function GET() {
  const value = await redis.get("MydoCounter");
  const number = parseInt(value!);
  return { value: number };
}
