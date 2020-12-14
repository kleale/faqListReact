import React, { Component } from "react";
import { Spinner } from "reactstrap";
import "./App.css";
//import Backend from "./components/backend";
import i18n_ru from "./i18n_ru.json";
import RegisterPage from "./components/_registerpage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      i18n: null,
      lang: "ru",
    };
    //this.backend = new Backend();
  }

  updateI18n() {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      //LOCAL
      this.setState({ i18n: i18n_ru });
    } else {
      //SERVER
      this.setState({ i18n: null });
      this.backend.getI18n(
        "/NDI_EPCOMMON_D~gzpn~faq~service~rs~gazprom-neft.ru/rs/faq/i18n?lang="+this.state.lang,
        oI18n => {
          this.setState({ i18n: oI18n });
          document.title = oI18n.register.caption;
        }
      );
    }
  }

  componentDidMount() {
    this.updateI18n();
  }


  render() {
    return (this.state.i18n) ? (
      <RegisterPage i18n={this.state.i18n.register} lang={this.state.lang} />
    ) : (
      <Spinner color="dark" className="spinner" />
    );
  }
}

export default App;
