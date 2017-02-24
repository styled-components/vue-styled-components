import Vue from 'vue';
import styled from '../src/index';

require('./docs.scss');

function throttle(callback, limit) { /* eslint-disable func-names*/
  let wait = false;
  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

const SL = ', 100%, 85%';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      isNavSticky: false,
      firstColor: Math.floor(Math.random() * 255),
      secondColor: Math.floor(Math.random() * 255),
    };
  },
  computed: {
    gradient() {
      return {
        background: `linear-gradient(to left bottom, hsl(${this.firstColor + SL}) 0%, hsl(${this.secondColor + SL}) 100%)`,
      };
    },
  },
  methods: { /* eslint-disable no-undef */
    adjustNav() {
      this.isNavSticky = window.scrollY > window.innerHeight;
    },
  },
  mounted() {
    this.adjustNav();
    window.addEventListener('scroll', throttle(this.adjustNav, 50));
  },
});

const StyledButton = styled.button`
  display: inline-block;
  background: white;
  color: #4fc08d;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #4fc08d;
  border-radius: 3px;
`;

new Vue({
  el: '#simple-example',
  template: '<styled-button> Styled Button </styled-button>',
  components: {
    'styled-button': StyledButton,
  },
});

const HugeButton = styled(StyledButton)`
  background: #4fc08d;
  color: white;
  font-size: 2em;
  padding: 0.8em 2em;
  border: 4px solid #4fc08d;
`;

new Vue({
  el: '#extend-example',
  template: '<huge-button> Huge Button </huge-button>',
  components: {
    'huge-button': HugeButton,
  },
});
