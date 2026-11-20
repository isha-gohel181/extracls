/**
 * Seeds placeholder free video classes for the home page carousel.
 * Replace URLs anytime in Admin → Free Content.
 * Usage: node scripts/seedLandingFreeVideos.mjs
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not set in backend/.env');
  process.exit(1);
}

const { default: FreeContent } = await import('../models/FreeContent.js');

const PLACEHOLDER_VIDEOS = [
  {
    title: 'Phonics fun for young readers',
    description: 'Short introduction to letter sounds and joyful reading for preschool learners.',
    videoUrl: 'https://www.youtube.com/watch?v=BELlZKpi1Zs',
    landingSortOrder: 0,
  },
  {
    title: 'Counting with everyday objects',
    description: 'Help children build number sense using simple home activities.',
    videoUrl: 'https://www.youtube.com/watch?v=DQdB9Ggyzi8',
    landingSortOrder: 1,
  },
  {
    title: 'Creative art and colors',
    description: 'Easy art ideas that encourage curiosity and fine motor skills.',
    videoUrl: 'https://www.youtube.com/watch?v=OK_QO-uDFeE',
    landingSortOrder: 2,
  },
];

async function main() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 30000 });
  const existing = await FreeContent.countDocuments({
    contentType: 'class',
    showOnLandingCarousel: true,
  });
  if (existing > 0) {
    console.log(`Skipped: ${existing} landing carousel item(s) already exist.`);
    await mongoose.disconnect();
    return;
  }
  for (const row of PLACEHOLDER_VIDEOS) {
    await FreeContent.create({
      ...row,
      contentType: 'class',
      isActive: true,
      showOnLandingCarousel: true,
      isDownloadable: false,
    });
  }
  console.log(`Created ${PLACEHOLDER_VIDEOS.length} landing carousel videos.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});