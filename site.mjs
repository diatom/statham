/* global Deno */
import * as a from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/all.mjs'
import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
import * as dg from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/dom_glob_shim.mjs'
// import {paths as pt} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/io_deno.mjs'
import * as pt from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/path.mjs'

import * as l from './live.mjs'

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

import * as data from './data/data.js'
import * as qoutes from './data/qoutes.js'

const {E} = new p.Ren(dg.document).patchProto(dg.glob.Element)

const DEV = Deno.args.includes(`--dev`)

class Page extends a.Emp {
  constructor(site) {
    // console.log(site)
    super()
    this.site = a.reqInst(site, Site)
  }

  urlPath() {return ``}

  fsPath() {
    const path = a.laxStr(this.urlPath())
    return path && a.stripPre(path, `/`) + `.html`
  }

  targetPath() {
    const path = a.laxStr(this.fsPath())
    return path && pt.posix.join(`target`, path)
  }

  title() {return ``}

  res() {return a.resBui().html(this.body()).res()}

  body() {return ``}

  
  async write() {
    const path = pt.toPosix(this.targetPath())
    if (!path) return

    const body = this.body()
    if (!body) return

    await Deno.mkdir(pt.posix.dir(path), {recursive: true})
    // console.log(path)
    // console.log(pt.dir(path))
    await Deno.writeTextFile(path, body)

    console.log(`[html] wrote`, path)
  }
}

// 404 //
class Page404 extends Page {
  // Only for `Nav`.
  urlPath() {return `404`}
  fsPath() {return `404.html`}
  title() {return `Страница не найдена`}
  res() {return a.resBui().html(this.body()).code(404).res()}

  body() {
    const tit = `Ошбика: 404`
    const desc = `Ошбика 404`
    const img = `https://statham.fun/images/statham.png`
    return Layout(tit, desc, img,
      E.main.chi(
        E.a.props({href: `/`, class: `error`}).chi(
          E.h1.chi(this.title()),
          E.img.props({alt: `404`, src: `/images/statham.png`, class: `error`})
        )        
      ),
      Footer(this)
    )
  }
}

// Main //
class PageIndex extends Page {
  urlPath() {return `/`}
  fsPath() {return `index.html`}
  title() {return `Стетхем`}

  body() {
  const tit = `Цитаты Стетхема`
  const desc = `Сборник цитат Джейсона Стетхема`
  const img = `https://statham.fun/images/statham.png`
    return Layout(tit, desc, img,
      Nav(this),
      E.main.chi(
        E.hey.chi(
          E.div.props({class: `greeting`}).chi(
            E.h1.chi(`Джейсон Стетхем — это великий русский поэт, а здесь его цитаты`),
            E.span.chi(`Последнее обновление: 05.08.2025`),
            E.a.props({href: `https://pay.cloudtips.ru/p/61bbe89e`, class: `donate`}).chi(`Подкинуть донаты Стетхему на новую парку`),
            E.h3.chi(`Цитата дня`),
            E.div.props({class: `today-quote`}).chi(``),
          ),
          E.div.props({class: `img-hey`}).chi(
            E.img.props({src: `/images/statham.png`, alt: `Statham`}),
            E.a.props({href: `https://drinkibri.ru/`, target: `_blank`}),
          ),
          E.div.props({class: `adult`}).chi(`18+`)
        ),
        E.div.props({class: `chat`}).chi(
          E.input.props({type: `text`, id: `userInput`, placeholder: `Задай вопрос Стетхему`}),
          E.button.props({onclick: `getResponse()`}).chi(`Спросить у Стетхема`),
        ),
        E.div.props({class: `chat`}).chi(
          E.p.props({id: `response`}),
        ),
        E.div.props({class: `box-qoute`}).chi(
          E.div.props({class: `button-quote`}),
          E.p.chi(`Случайная цитата по клику`),
          E.button.props({class: `quote-button`}).chi(E.img.props({src: `/images/statham-qoute.jpg`})),
          E.div.props({class: `click-count`}).chi(`0`),
        ),
        E.block.chi(
          E.div.props({class: `block-info`}).chi(
            E.h2.chi(`Все цитаты Джейсона Стетхема`),
            getItem(qoutes.q)
          ),
        ),
      ),
      Footer(this)
    )
  }
}
function getItem(a) {
  return E.div.chi(
    a.map((val) => {
      return E.div.props({class: `quote`, id: a.indexOf(val)}).chi(E.button.chi(
        E.img.props({src: `images/anchor.svg`, alt: `anchor`, class: `a-svg`})
      ).props({class: `copy-b`}), `— ` + val)
    })
)
}
// Omar //
class PageOmar extends Page {
  urlPath() {return `/omarkhayam`}
  fsPath() {return `omarkhayam.html`}
  title() {return `Омар Хайям`}

  body() {
  const tit = `Омар Хайям`
  const desc = `Омар Хайям – цитаты`
  const img = `https://statham.fun/images/omar_khayyam_original.jpg`
    return Layout(tit, desc, img,
      Nav(this),
      E.main.chi(
        E.hey.props({class: `hey-center`}).chi(
          E.div.props({class: `img-sage`}).chi(
            E.img.props({src: `/images/omar_khayyam.jpg`, alt: `Omar Khayam`}),          
          ),
        ),
      ),
      Footer(this)
    )
  }
}
// Confuciy //
class PageConfuciy extends Page {
  urlPath() {return `/confuciy`}
  fsPath() {return `confuciy.html`}
  title() {return `Конфуций`}

  body() {
  const tit = `Конфуций`
  const desc = `Конфуций – цитаты`
  const img = `https://statham.fun/images/confuciy.jpg`
    return Layout(tit, desc, img,
      Nav(this),
      E.main.chi(
        E.hey.props({class: `hey-center`}).chi(
          E.div.props({class: `img-sage`}).chi(
            E.img.props({src: `/images/confuciy.jpg`, alt: `Confuciy`}),          
          ),
        ),
      ),
      Footer(this)
    )
  }
}

class Site extends a.Emp {
  constructor() {
    super()
    this.notFound = new Page404(this)
    this.nav = [new PageIndex(this), new PageOmar(this), new PageConfuciy(this)]
  }
  all() {return [this.notFound, ...this.nav]}  
}
export const site = new Site()
// console.log(site.all())

function Layout(tit, desc, img, ...chi) {
  return p.renderDocument(
    E.html.chi(
      E.head.chi(
        E.meta.props({charset: `utf-8`}),
        E.meta.props({name: `viewport`, content: `width=device-width, initial-scale=1`}),
        E.title.chi(tit),
        E.meta.props({name: `description`, content: desc}),
        E.meta.props({name: `keywords`, content: `цитаты стетхема, цитаты, Джэйсон Стэтхем, цитаты Джэйсон Стэтхем, пацанские цитаты джейсона стетхема`}),
        E.meta.props({property: `og:title`, content: tit}),
        E.meta.props({property: `og:description`, content: desc}),
        E.meta.props({property: `og:type`, content: `website`}),
        E.meta.props({property: `og:site_name`, content: `statham.fun`}),
        E.meta.props({property: `og:url`, content: `https://statham.fun/`}),
        E.meta.props({property: `og:image`, content: img}),
        E.meta.props({property: `og:image:height`, content: `600`}),
        E.meta.props({property: `og:image:width`, content: `300`}),
        E.meta.props({property: `og:image:type`, content: `image/jpeg`}),
        E.link.props({rel: `icon`, type: `image/x-icon`, href: `/images/icon.ico`}),
        E.link.props({rel: `stylesheet`, href: `/main.css`}),
        E.style.chi(`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap')`),
        E.style.chi(`@import url('https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV,SHRP@100..900,0..1,0..100&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');`),
        a.vac(DEV) && E.script.chi(`navigator.serviceWorker.register('/sw.mjs')`),
        Md(`./data/anal.md`)
      ),
      E.body.chi(chi),
      E.script.props({type: `module`, src: `/browser.mjs`, defer: ``}),
      // E.script.props({type: `module`, src: `/site.mjs`}),
      a.vac(DEV) && E.script.props({type: `module`, src: l.LIVE_CLIENT}),
    )
  )
}

function Nav(page) {
  return E.header.chi(
    // E.a.props({href: `/`, class: `logo`}).chi(E.img.props({src: `/images/ibri-logo-white.svg`, alt: `Ibri`})),
    E.nav.props({class: `nav-head`}).chi(a.map(page.site.nav, PageLink), 
      // E.menu.chi(
      //   getMenu()
      // )
    ),
    // E.mobilemenu.chi(a.map(page.site.nav, PageLink)),
  )
}
function getMenu() {
  return Array.from({ length: 9 }, () => E.div)
}


function NavFooter(page) {
  return E.nav.chi(a.map(page.site.nav, PageLink)
    )
}
const currentYear = new Date().getFullYear();

function Footer(page) {
  return E.footer.props({id: `footer`}).chi(
    E.p.chi(`Материал предназначен для лиц старше 18 лет. Данный сайт сделан в юмористических целях. Весь материал собран из открытых источников сети интернета`),
      E.div.chi(
        Contact(data.contact)
      ),
    E.span.chi(E.a.props({href: `https://github.com/diatom`}).
    chi(`© ${currentYear}. Сайт сделал Severin B. 👾`)
    )
  )
}

function PageLink(page) {
  a.reqInst(page, Page)
  const pro = {
    href: page.urlPath(),
    id: page.title(),
  }
  if (page.title() === "Ibri®") {
    pro.target = "_blank"
    pro.rel = "noopener noreferrer"
  }
  return E.a.props(pro).chi(page.title())
}

function Contact(cont) {
  return cont.map((val) => {
    for (let [key, value] of Object.entries(val)) {
      return E.a.props({href: value}).chi(key)
    }
  })
}

function AllTags(page) {
  return E.tags.chi(
    E.span.props({class: `help`}).chi(`Теги:`),
    data.arttags.map(val => 
      E.button.props({type: `button`, class: `btn`}).chi(E.span.chi(`#`), val)
    )
  )
}

function ArtTags(tag) {
  return E.arttags.chi(
    E.span.props({class: `help`}).chi(`Теги:`),
    tag.map((val) => 
      E.button.props({type: `button`, class: `btn`}).chi(E.span.chi(`#`), val)
    )
  )
}

function BookTags(tag) {
  return E.tags.chi(
    E.span.props({class: `help`}).chi(`Теги:`),
    tag.map(val =>
      E.button.props({type: `button`, class: `btn`, id: val.id}).chi(E.span.chi(`#`), val.n)
    )
  )
}

function Md(md) {
  return new p.Raw(marked(Deno.readTextFileSync(md)))
}