<template>
  <div class="ebook-reader">
      <div id='read'>
      </div>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin.js'

import Epub from 'epubjs'
import { getFontFamily, saveFontFamily,getFontSize,saveFontSize, getTheme, saveTheme } from '../../utils/localStorage.js'
global.ePub = Epub
export default {
    mixins:[ebookMixin],
    mounted(){
         this.setFileName(this.$route.params.fileName.split('|').join('/'))
         .then(()=>{
             this.initEpub()
         })
        // console.log(this.fileName);
    },
    methods:{
        prevPage(){
            if(this.rendition) this.rendition.prev()
        },
        nextPage(){
            if(this.rendition) this.rendition.next()
        },
        toggleTitleAndMenu(){
             this.setMenuVisible(!this.menuVisible)
             if(!this.menuVisible) {
                 this.setSettingVisible(-1)
                 this.setFontFamilyVisible(false)
             }
        },
        hideTitleAndMenu(){
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        initTheme(){
            let defaultTheme = getTheme(this.fileName)
            if(!defaultTheme) {
                defaultTheme = this.themeList[0].name;
                saveTheme(this.fileName,defaultTheme)
            }
            this.setDefaultTheme(defaultTheme)
            this.themeList.forEach(theme => {
                this.rendition.themes.register(theme.name,theme.style)
            })
            this.rendition.themes.select(defaultTheme)
        },
        initFontSize(){
            let fontSize = getFontSize(this.fileName)
                if(!fontSize) saveFontSize(this.fileName,this.defaultFontSize)
                else {
                    this.rendition.themes.fontSize(fontSize)
                    this.setDefaultFontSize(fontSize)
                }
        },
        initFontFamily(){
            let font = getFontFamily(this.fileName)
                if(!font) saveFontFamily(this.fileName,this.defaultFontFamily)
                else {
                    this.rendition.themes.font(font)
                    this.setDefaultFontFamily(font)
                }
        },
        initRendition(){
            this.rendition = this.book.renderTo('read',{
                width:'100vw',
                height:'100vh',
                // method:'default' //wx,打开页面空白
            }
            )
            this.rendition.display().then(()=>{
                this.initTheme()
                this.initFontSize()
                this.initFontFamily()
                this.initGlobalStyle()
            })
            this.rendition.hooks.content.register(contents => {
                Promise.all(
                    [
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
                    ]
                ).then(()=>{})
                
            })
        },
        initGesture(){
            //绑定方法
            this.rendition.on('touchstart',e => {
                this.touchStartX = e.changedTouches[0].clientX;
                this.touchStartTime = e.timeStamp;
            }, { passive: false })
            this.rendition.on('touchend',e => {
                
                const offsetX = e.changedTouches[0].clientX - this.touchStartX;
                const time = e.timeStamp - this.touchStartTime;
                // console.log(offsetX,time);

                //判断翻页
                if(time < 500 && offsetX > 40){ //从左往右滑动
                    this.prevPage()
                    this.hideTitleAndMenu()
                } else if(time < 500 && offsetX < -40){///从右往左滑动
                    this.nextPage()
                    this.hideTitleAndMenu()
                } else{ //显示菜单栏
                    this.toggleTitleAndMenu()
                }

                // e.preventDefault();
                // e.stopPropagation();
            },{passive:false})
        },
        initEpub(){
            const url = `${process.env.VUE_APP_RES_URL}/${this.fileName}.epub`;
            // const url = 'http://localhost:8081/History/2017_Book_InterdisciplinaryPerspectivesO.epub'
            this.book = new Epub(url)
            this.setCurrentBook(this.book)
            this.initRendition()
            this.initGesture()

            //分页
            this.book.ready.then(()=>{
                return this.book.locations.generate(750*(window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
            }).then(()=>{
               this.setBookAvailable(true)
            })
        }
    }
}
</script>

<style>

</style>