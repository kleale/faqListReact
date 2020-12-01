import React, { Component } from "react";
import { Spinner, Alert, Button } from "reactstrap";

import Faqlist from "./_faqlist";

//import Backend from "./backend";
import ProgressIndicator from "./progressindicator";
import i18n_en from "../i18n_en.json";
import i18n_ru from "../i18n_ru.json";


class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headtext: props.i18n.headText,
      status: undefined,
      progress: undefined,
      httpError: undefined,
      alertText: undefined,
      alertColor: undefined,
      alertVisible: false,
      hasError: undefined,
      modal: false,
      lang: this.props.lang,
      i18n: this.props.i18n
    };

    this.alertRef = React.createRef();
    //this.backend = new Backend();
  }

  //modal show-hide
  handleModalFAQ = (title, text) => {
    this.setState({
      modal: !this.state.modal,
      title: title,
      text: text
    });
  };

  scrollToMyRef = (myRef) => window.scrollTo(0, myRef.current.offsetTop)

  componentDidMount() {
    // ie
    let ie = require("ie-version");
    if (ie.version && ie.version <= 9) {
      this.setState({ status: "oldbrowser" });
    } else {
      this.setState({ status: "FAQList" });
    }
  }


  handleProgress = event => {
    console.log("progressEvent", event);
    if (event.lengthComputable) {
      let percentage = Math.round((event.loaded * 100) / event.total);

      this.setState({
        status: "FAQList",
        progress: percentage,
        httpError: "",
        alertVisible: false
        //headtext: this.props.i18n.progressIndicator.caption
      });
    }
  };

  handleError = httpError => {
    this.setState({
      status: "FAQList",
      httpError: httpError,
      //headtext: "",
      alertText: this.props.i18n.errors[httpError],
      alertColor: "danger",
      alertVisible: true,
      //hasError: 1
    });
    this.scrollToMyRef(this.alertRef);
  };

  oldBrowser() {
    return (
      <React.Fragment>
        <p className="not-supported">
          Вам необходимо обновить Ваш браузер. Используйте последние версии
          Internet Explorer и Google Chrome.
        </p>
        <p className="not-supported">
          Your need to update your Browser. Use the latest versions of IE and
          Google Chrome.
        </p>
      </React.Fragment>
    );
  };

  handleClickBack() {
    window.location.assign("/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/");
  }

  // alert dismiss
  onDismissAlert = () => {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  changeLang = () => {
    if (this.state.lang === "ru") {
      this.setState({ lang: "en" });
      this.updateI18n("en");
    } else {
      this.setState({ lang: "ru" });
      this.updateI18n("ru");
    }
  }

    updateI18n = (lang) => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      //LOCAL
      if (lang === "en") {
        this.setState({ i18n: i18n_en.register });
      } else {
        this.setState({ i18n: i18n_ru.register });
      }
    } else {
      //SERVER
      this.backend.getI18n(
        "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/i18n?lang=" + lang,
        oI18n => {
          this.setState({ i18n: oI18n.register });
        }
      );
    }
  }

  render() {
    let i18n = this.state.i18n;
    let content = undefined;

    switch (this.state.status) {
      case "error":
        content = <Button outline color="primary" onClick={this.handleClickBack}>Вернуться к форме регистрации</Button>;
        break;
      case "success":
        content = <Button outline color="primary" onClick={this.handleClickBack}>Вернуться к форме регистрации</Button>;
        break;
      case "oldbrowser":
        content = this.oldBrowser();
        break;
      // case "progress":
      //   content = <ProgressIndicator value={this.state.progress} />;
      //   break;

      case "FAQList":
        content = <Faqlist i18n={i18n} list={i18n.faq.questions}/>;
        break;

      default:
        content = <Spinner color="dark" className="spinner" />;
    }

    return (
      <div className="container" ref={this.alertRef}>
        <div className="pt-3">
          <img
            className="d-block ml-auto mr-0 mb-4"
            src="/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/regform/logo.png"
            alt="logo"
          />
          <div>
            <button className="langbutton" title={i18n.langTooltip} href="javascript:void(null);" onClick={this.changeLang}>{this.state.lang === "ru" ? 'Eng' : 'Rus'}</button>
            {/* <button className="langbutton mr-2" href="javascript:void(null);" onClick={this.handleModalFAQ}>FAQ</button> */}
          </div>
          <h2>{i18n.caption}</h2>
          <div className="lead pb-3" dangerouslySetInnerHTML={{ __html: this.state.headtext }} />
          <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.onDismissAlert}>
            <h4 className={this.state.httpError ? 'alert-heading' : 'alert-heading hidden'} >{this.state.httpError}</h4>
            <div dangerouslySetInnerHTML={{ __html: this.state.alertText }} />
          </Alert>
          <div className={this.state.progress < 100 ? 'pt-3 pb-3' : 'pt-3 pb-3 hidden'}>
            <ProgressIndicator value={this.state.progress} />
          </div>
        </div>

        {content}

      </div>
    );
  }
}

export default RegisterPage;
