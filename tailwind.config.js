/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'dark-brown': '#403b38',
        'soft-beige': '#c4c1b8',
        green: '#1e5340',
      },
      fontSize: {
        xs: ['0.75rem', '1rem'], // 12px, 16px
        sm: ['0.875rem', '1.25rem'], // 14px, 20px
        base: ['1rem', '1.5rem'], // 16px, 24px
        lg: ['1.125rem', '1.75rem'], // 18px, 28px
        xl: ['1.25rem', '1.75rem'], // 20px, 28px
        '2xl': ['1.5rem', '2rem'], // 24px, 32px
        '3xl': ['1.875rem', '2.25rem'], // 30px, 36px
        '4xl': ['2.25rem', '2.5rem'], // 36px, 40px
        '5xl': ['3rem', '1'], // 48px, 48px
        '6xl': ['3.75rem', '1'], // 60px, 60px
        '7xl': ['4.5rem', 1], // 72px, 72px
        '8xl': ['6rem', 1], // 96px, 96px
        '9xl': ['8rem', 1], // 128px, 128px
      },
      screens: {
        xs: '0px',
        sm: '640px', // Small
        md: '768px', // Medium
        lg: '1024px', // Large
        xl: '1280px', // Extra Large
        '2xl': '1536px', // 2X Large
      },
      spacing: {
        0: '0px',
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        10: '2.5rem', // 40px
        12: '3rem', // 48px
        16: '4rem', // 64px
        20: '5rem', // 80px
        24: '6rem', // 96px
        32: '8rem', // 128px
        40: '10rem', // 160px
        48: '12rem', // 192px
        56: '14rem', // 224px
        64: '16rem', // 256px
        72: '18rem', // 288px
        80: '20rem', // 320px
        96: '24rem', // 384px
        114: '28rem', // 448px
        128: '32rem', // 512px
        144: '36rem', // 576px
        160: '40rem', // 640px
        192: '48rem', // 768px
        214: '55rem', // 880px
        256: '64rem', // 1024px
      },
      gridTemplateRows: {
        layout: '65px minmax(0, 1fr) 65px',
        'layout-mob': '61px minmax(0, 1fr) 49px',
      },
      gridTemplateColumns: {
        catalog: 'repeat(auto-fit, 18.25rem)',
        'catalog-mob': 'repeat(auto-fit, 10.25rem)',
        lookbook: 'repeat(auto-fit, 30.75rem)',
        'lookbook-mob': 'repeat(auto-fit, 20.5rem)',
        cart: 'repeat(auto-fit, 24rem)',
        'cart-mob': 'repeat(auto-fit, 20rem)',
        message: 'repeat(auto-fit, 20rem)',
      },
    },
  },
  plugins: [],
};
