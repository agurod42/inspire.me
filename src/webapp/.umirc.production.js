
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  define: {
    'process.env.API_URL': 'http://ec2-54-209-252-217.compute-1.amazonaws.com'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'webapp',
      dll: true,
      routes: {
        exclude: [
        
          /components\//,
        ],
      },
    }],
  ],
}
