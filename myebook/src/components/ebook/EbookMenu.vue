<template>
<div>
  <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0}" v-show="menuVisible">
        <!-- 3:目录 -->
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <!-- 2:进度 -->
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <!-- 1:主题 -->
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <!-- 0:字号 -->
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin.js'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'

export default {
    mixins:[ebookMixin],
    components:{
      EbookSettingFont,
      EbookSettingFontPopup,
      EbookSettingTheme,
      EbookSettingProgress
    },
    methods:{
        showSetting(key){
          this.setSettingVisible(key)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../assets/style/global';
  .menu-wrapper {
    font-size: px2rem(20);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }

</style>