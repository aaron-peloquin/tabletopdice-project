import React, { Component, Fragment } from 'react'
import './styles.css'
import { Header, Footer } from './layout/'

export default class extends Component {
  render() {
    return <Fragment>
      <Header />
      <section>
        <p>Body</p>
      </section>
      <Footer />
    </Fragment>
  }
}
