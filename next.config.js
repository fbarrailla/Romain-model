/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Romain-model' : '',
  assetPrefix: isProd ? '/Romain-model/' : '',
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
