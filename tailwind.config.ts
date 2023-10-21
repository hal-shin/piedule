import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {},
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
