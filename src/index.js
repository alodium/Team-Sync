import React from 'react'
import ReactDOM from 'react-dom'
import { Parallax } from 'react-spring'
import './styles.css'

let CLOSING_PAGE_CONTNET = '<p></p>'
let OPEN_PAGE_CONTENT = '<p> no tech discussions or long bug descriptions please</p>'

var today = new Date().getDay()

switch (today) {
  case 1:
    CLOSING_PAGE_CONTNET += '<p> videolunch videos?</p>' + '<p> anybody techtalk this week? (remember to invite the mobile team) </p>'
    break
  case 2:
    CLOSING_PAGE_CONTNET += '<p><H1>Who is doing the team meeting?</H1></p>'
    OPEN_PAGE_CONTENT += '<p><b>First one - team meeting tickets 🥳</b></p>'
    break
  case 3:
    CLOSING_PAGE_CONTNET += '<p><H1>Who can check airbrake?</H1></p>'
    break
  case 5:
    CLOSING_PAGE_CONTNET += '<p><H1>Friday dance ?🎉</H1></p>'
    break
}

const names = [
  'Oliver 🐙',
 'Minjung 👪 ',
 'Robert ?',
 'Jennie 🤦',
 'Madison 🦉',
 'André 😋',
 'Lior 🐃',
 'Martin 😾',
 'Kevin 🦁',
 'Mathilde 🙆',
      ]

let currentPage = 0
const nameCount = names.length
const pageCount = nameCount + 2
const getRandomNumber = to => Math.floor(Math.random() * Math.floor(to))
const getRandomName = () => names.splice(getRandomNumber(names.length), 1)[0] || ''
const getTitle = i => (i === 0 ? 'Today we start with' : i === nameCount - 1 ? 'last but not least' : 'Next up')
const getCounter = $el => countdown(2, $el)

const Page = ({ content, offset, title, name = getRandomName(), onClick, gradient = getRandomNumber(4) }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd g${gradient}`} />
    </Parallax.Layer>

    <Parallax.Layer className="text header" offset={offset} speed={0.7}>
      <span>
        <p style={{ fontSize: 20 }}>{title}</p>
        <div className={`stripe g${gradient}`} />
        <p>{name}</p>
        <p dangerouslySetInnerHTML={{ __html: content }} className="content" />
      </span>
    </Parallax.Layer>
  </React.Fragment>
)

var $el

class App extends React.Component {
  scroll = to => this.refs.parallax.scrollTo(to)
  scrollTo = to => () => {
    currentPage = to
    this.scroll(currentPage)
    this.onViewClick()
  }
  onKeyPressed = e => {
    let offset = 0
    switch (e.keyCode) {
      case 37:
        offset = -1
        break
      case 13:
      case 39:
        offset = 1
        break
      default:
        break
    }
    currentPage = (currentPage + pageCount + offset) % pageCount
    this.scroll(currentPage)
    this.onViewClick()
  }

  onViewClick = () => {
    $el && $el.remove()
    $el = document.createElement('div')
    $el.className = 'counter'
    $el.innerHTML = 'Ready?'
    document.body.appendChild($el)
    getCounter($el)
  }
  render() {
    return (
      <div tabIndex={'0'} onKeyUp={this.onKeyPressed}>
        <Parallax className="container" ref="parallax" pages={pageCount} horizontal scrolling={false}>
          <Page offset={0} title={'Welcome everyone'} content={OPEN_PAGE_CONTENT} name={''} onClick={this.scrollTo(1)} />
          {names.map((_, i) => (
            <Page offset={i + 1} title={getTitle(i)} onClick={this.scrollTo(i + 2)} key={i} />
          ))}
          <Page offset={pageCount - 1} content={CLOSING_PAGE_CONTNET} title={'Have a nice day'} name={'🌞'} onClick={this.scrollTo(0)} />
        </Parallax>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

var int
function countdown(min, $el) {
  if (!$el) return
  var counter
  var time = min * 60,
    tmp = time
  int && clearInterval(int)
  int = setInterval(function() {
    var c = tmp--,
      minutes = (c / 60) >> 0,
      seconds = (c - minutes * 60 + '').padStart(2, '0'),
      content = 'Ready?'
    if (c === 0 && minutes === 0) {
      content = 'NEXT! (action items?)'
      clearInterval(int)
    } else {
      content = minutes + ':' + seconds
    }
    if ($el) {
      $el.innerHTML = content
    }

    tmp != -1 || (tmp = time)
  }, 1000)
  return counter
}
