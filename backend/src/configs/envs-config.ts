import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

const envSchema = z.object({
  PORT: z.string('Port is Missing'),
  MONGO_URI: z.string('Mongo URI is Missing'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid or missing environment variables:');
  console.error(_env.error.format());
  process.exit(1);
}

const ENV = {
  PORT: Number(_env.data.PORT),
  MONGO_URI: _env.data.MONGO_URI,
};

export default ENV;
