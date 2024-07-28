# The Art of Micro Frontends - Second Edition

<a href="https://www.packtpub.com/en-in/product/the-art-of-micro-frontends-9781835460351"><img src="https://content.packt.com/_/image/original/B22009/cover_image_large.jpg" alt="Book Name" height="256px" align="right"></a>

This is the code repository for [The Art of Micro Frontends - Second Edition](https://www.packtpub.com/en-in/product/the-art-of-micro-frontends-9781835460351), published by Packt.

**Build highly scalable, distributed web applications with multiple teams**

## What is this book about?
This guide empowers you to conquer the challenges of building scalable web apps. You’ll gain a deep understanding of key concepts, explore implementation techniques, and learn how to effectively supervise your applications for optimal performance.

This book covers the following exciting features:
* Understand how to choose the right micro frontend architecture
* Use screen designs and isolated styles for compositional UIs
* Create outstanding developer experiences for micro frontend solutions
* Introduce governance and boundary checks for managing distributed frontends
* Share dependencies and expose micro frontends with module federation
* Build scalable modular web applications from scratch or by migrating an existing monolith

If you feel this book is for you, get your [copy](https://www.amazon.com/Art-Micro-Frontends-compositional-application/dp/1835460356) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. For example, Chapter05.

The code will look like the following:
```
const generalProxy = new Proxy(() => generalProxy, {
  get(target, name) {
    if (name === Symbol.toPrimitive) {
      return () => ({}).toString();
    } else {
      return generalProxy();
    }
  },
});
```

**Following is what you need for this book:**
This book is for software architects, lead developers, senior web developers, and frontend engineers. Beginner-level knowledge of HTML and CSS, as well as a solid understanding of JavaScript programming and its ecosystem, including Node.js and npm, is assumed.

With the following software and hardware list you can run all code files present in the book (Chapter 5-13).

### Software and Hardware List

| Chapter  | Software required                   | OS required                        |
| -------- | ------------------------------------| -----------------------------------|
| 5-13        | Node.js 20 (or higher)                     | Windows, macOS, or Linux (any distro) |
| 5-13        | npm 10 (or higher)            | Git |
| 5-13        | ECMAScript 2020 (or higher)            | |

## Code in Action

Click on the following link to see the Code in Action:

https://packt.link/yNAAE

### Related products
* JavaScript Design Patterns [[Packt]](https://www.packtpub.com/en-us/product/javascript-design-patterns-9781804612279) [[Amazon]](https://www.amazon.com/Javascript-Design-Patterns-production-grade-applications/dp/1804612278/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=)

* Building Micro Frontends with React 18 [[Packt]](https://www.packtpub.com/en-in/product/building-micro-frontends-with-react-18-9781804610961) [[Amazon]](https://www.amazon.com/Building-Micro-Frontends-React-microfrontend/dp/1804610968/)

## Get to Know the Author
**Florian Rappl** is a solution architect working on distributed web applications for digital transformation and IoT projects. His main interest lies in the implementation of micro frontends and their impact on teams and business models. In this area, he led several teams, realizing many successful projects over the last few years.
As the lead architect, he has helped to create outstanding web applications for many industry-leading companies. He regularly gives lectures on software design patterns and web development. Florian has won multiple prizes for his work over the years and is recognized as a Microsoft MVP for development technologies.
He started his career in software engineering before studying physics and helping to build an energy-efficient supercomputer. Florian currently lives in Munich, Germany, with his wife and their two daughters.

## Other books by the author
* [The Art of Micro Frontends](https://www.packtpub.com/en-in/product/the-art-of-micro-frontends-9781800563568)
