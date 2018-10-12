<template>
  <div>
    <transition name="sideBar">
      <div v-if='isSideBarOpen' id="sideNav" class="bm-menu">
        <nav class="bm-item-list">
          <slot></slot>
        </nav>
        <span class="bm-cross-button cross-style" @click="closeMenu">
          <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
          </span>
        </span>
      </div>
    </transition>
    <div class="bm-burger-button" @click="openMenu">
      <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'menubar',
  data () {
    return {
      isSideBarOpen: false
    }
  },
  methods: {
    openMenu () {
      this.$emit('openMenu')
      this.isSideBarOpen = true
    },
    closeMenu () {
      this.$emit('closeMenu')
      this.isSideBarOpen = false
    },
    closeMenuOnEsc (e) {
      e = e || window.event
      if (e.key === 'Escape' || e.keyCode === 27) {
        this.isSideBarOpen = false
      }
    },
    documentClick (e) {
      let element = document.querySelector('.bm-burger-button')
      let target = e.target
      if (
        element !== target &&
        !element.contains(target) &&
        e.target.className !== 'bm-menu'
      ) {
        this.closeMenu()
      }
    }
  },

  mounted () {
    document.addEventListener('keyup', this.closeMenuOnEsc)
  },
  created () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed () {
    document.removeEventListener('keyup', this.closeMenuOnEsc)
    document.removeEventListener('click', this.documentClick)
  }
}
</script>

<style>
html {
  height: 100%;
}
.bm-burger-button {
  position: relative;
  width: 36px;
  height: 30px;
  /*
  left: 36px;
  top: 36px;
  */
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #fff;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 300px; /* 0 width - change this with JavaScript */
  padding-top: 60px; /* Place content 60px from the top */
  z-index: 1000; /* Stay on top */
  background-color: rgb(63, 63, 65); /* Black*/
  position: fixed; /* Stay in place */
  top: 0;
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  /* transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}

/*
 * sideBar transition
 */
.sideBar-enter, .sideBar-leave-to {
  opacity: 0;
  -webkit-transform: translateX(-300px);
  transform: translateX(-300px);
}

.sideBar-enter-active, .sideBar-leave-active {
  transition: all .5s;
}

</style>
