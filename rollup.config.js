import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts';

export default {
  input: 'src/index.ts',
  output: [ { file: 'dist/index.d.ts' } ],
  plugins: [
    del({ targets: ["dist/*"] }),
    typescript({ useTsconfigDeclarationDir: true }),
    dts(),
  ] 
}