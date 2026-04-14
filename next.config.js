/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const BASE_PATH = isProd ? '/Romain-model' : ''

const nextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
