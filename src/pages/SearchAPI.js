import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import parse from 'html-react-parser'
import InputSearch from '../components/InputSearch';
import findGetParameter from '../components/FindGetParameter';
import PaginatedItems from '../components/PaginatedItems';
import setGetParameter from '../components/SetGetParameter';
import timeToString from '../components/Time';
import './SearchAPI.css';
class SearchAPI extends Component {
  state = {
    q_t: findGetParameter('q_t', ''),//text
    q_p: findGetParameter('q_p', ''),//professions
    q_l: findGetParameter('q_l', ''),//levels
    q_c: findGetParameter('q_c', ''),//country
    q_cc: findGetParameter('q_cc', ''),//city
    q_ex: findGetParameter('q_ex', ''),//city
    search: '',
    filteredData: [],
    data: [],
    fetch_data: [],
    paginated_total: 0,
    paginated_item: findGetParameter('page', 1),
    q: findGetParameter('q', ''),
    next: 0,
  }
  componentDidMount = () => {
    this.getData();
    let search = this.getSearchString();
    if (search) {
      this.change(true, search, this.state.paginated_item)
    }
    this.setState({
      paginated_item: findGetParameter('page', 0),
      q: findGetParameter('q', ''),
    })
  }
  getData = () => {
    let arr = ['q_t', 'q_p', 'q_l', 'q_c', 'q_cc', 'q_ex'];
    let search = '';
    arr.forEach(e => {
      if (this.state?.[e]) search += `${this.state[e]} `;
    })
    this.setState({ search: search });
  };
  country = { "AU": ["Australia", "Австралия"], "AT": ["Austria", "Австрия"], "AZ": ["Azerbaijan", "Азербайджан"], "AX": ["Åland Islands", "Аландские о-ва"], "AL": ["Albania", "Албания"], "DZ": ["Algeria", "Алжир"], "AS": ["American Samoa", "Американское Самоа"], "AI": ["Anguilla", "Ангилья"], "AO": ["Angola", "Ангола"], "AD": ["Andorra", "Андорра"], "AQ": ["Antarctica", "Антарктида"], "AG": ["Antigua & Barbuda", "Антигуа и Барбуда"], "AR": ["Argentina", "Аргентина"], "AM": ["Armenia", "Армения"], "AW": ["Aruba", "Аруба"], "AF": ["Afghanistan", "Афганистан"], "BS": ["Bahamas", "Багамы"], "BD": ["Bangladesh", "Бангладеш"], "BB": ["Barbados", "Барбадос"], "BH": ["Bahrain", "Бахрейн"], "BY": ["Belarus", "Беларусь"], "BZ": ["Belize", "Белиз"], "BE": ["Belgium", "Бельгия"], "BJ": ["Benin", "Бенин"], "BM": ["Bermuda", "Бермудские о-ва"], "BG": ["Bulgaria", "Болгария"], "BO": ["Bolivia", "Боливия"], "BQ": ["Caribbean Netherlands", "Бонэйр, Синт-Эстатиус и Саба"], "BA": ["Bosnia & Herzegovina", "Босния и Герцеговина"], "BW": ["Botswana", "Ботсвана"], "BR": ["Brazil", "Бразилия"], "IO": ["British Indian Ocean Territory", "Британская территория в Индийском океане"], "BN": ["Brunei", "Бруней-Даруссалам"], "BF": ["Burkina Faso", "Буркина-Фасо"], "BI": ["Burundi", "Бурунди"], "BT": ["Bhutan", "Бутан"], "VU": ["Vanuatu", "Вануату"], "VA": ["Vatican City", "Ватикан"], "GB": ["United Kingdom", "Великобритания"], "HU": ["Hungary", "Венгрия"], "VE": ["Venezuela", "Венесуэла"], "VG": ["British Virgin Islands", "Виргинские о-ва (Великобритания)"], "VI": ["U.S. Virgin Islands", "Виргинские о-ва (США)"], "UM": ["U.S. Outlying Islands", "Внешние малые о-ва (США)"], "TL": ["Timor-Leste", "Восточный Тимор"], "VN": ["Vietnam", "Вьетнам"], "GA": ["Gabon", "Габон"], "HT": ["Haiti", "Гаити"], "GY": ["Guyana", "Гайана"], "GM": ["Gambia", "Гамбия"], "GH": ["Ghana", "Гана"], "GP": ["Guadeloupe", "Гваделупа"], "GT": ["Guatemala", "Гватемала"], "GN": ["Guinea", "Гвинея"], "GW": ["Guinea-Bissau", "Гвинея-Бисау"], "DE": ["Germany", "Германия"], "GG": ["Guernsey", "Гернси"], "GI": ["Gibraltar", "Гибралтар"], "HN": ["Honduras", "Гондурас"], "HK": ["Hong Kong SAR China", "Гонконг (САР)"], "GD": ["Grenada", "Гренада"], "GL": ["Greenland", "Гренландия"], "GR": ["Greece", "Греция"], "GE": ["Georgia", "Грузия"], "GU": ["Guam", "Гуам"], "DK": ["Denmark", "Дания"], "JE": ["Jersey", "Джерси"], "DJ": ["Djibouti", "Джибути"], "DM": ["Dominica", "Доминика"], "DO": ["Dominican Republic", "Доминиканская Республика"], "EG": ["Egypt", "Египет"], "ZM": ["Zambia", "Замбия"], "EH": ["Western Sahara", "Западная Сахара"], "ZW": ["Zimbabwe", "Зимбабве"], "IL": ["Israel", "Израиль"], "IN": ["India", "Индия"], "ID": ["Indonesia", "Индонезия"], "JO": ["Jordan", "Иордания"], "IQ": ["Iraq", "Ирак"], "IR": ["Iran", "Иран"], "IE": ["Ireland", "Ирландия"], "IS": ["Iceland", "Исландия"], "ES": ["Spain", "Испания"], "IT": ["Italy", "Италия"], "YE": ["Yemen", "Йемен"], "CV": ["Cape Verde", "Кабо-Верде"], "KZ": ["Kazakhstan", "Казахстан"], "KH": ["Cambodia", "Камбоджа"], "CM": ["Cameroon", "Камерун"], "CA": ["Canada", "Канада"], "QA": ["Qatar", "Катар"], "KE": ["Kenya", "Кения"], "CY": ["Cyprus", "Кипр"], "KG": ["Kyrgyzstan", "Киргизия"], "KI": ["Kiribati", "Кирибати"], "CN": ["China", "Китай"], "KP": ["North Korea", "КНДР"], "CC": ["Cocos (Keeling) Islands", "Кокосовые о-ва"], "CO": ["Colombia", "Колумбия"], "KM": ["Comoros", "Коморы"], "CG": ["Congo - Brazzaville", "Конго - Браззавиль"], "CD": ["Congo - Kinshasa", "Конго - Киншаса"], "CR": ["Costa Rica", "Коста-Рика"], "CI": ["Côte d’Ivoire", "Кот-д’Ивуар"], "CU": ["Cuba", "Куба"], "KW": ["Kuwait", "Кувейт"], "CW": ["Curaçao", "Кюрасао"], "LA": ["Laos", "Лаос"], "LV": ["Latvia", "Латвия"], "LS": ["Lesotho", "Лесото"], "LR": ["Liberia", "Либерия"], "LB": ["Lebanon", "Ливан"], "LY": ["Libya", "Ливия"], "LT": ["Lithuania", "Литва"], "LI": ["Liechtenstein", "Лихтенштейн"], "LU": ["Luxembourg", "Люксембург"], "MU": ["Mauritius", "Маврикий"], "MR": ["Mauritania", "Мавритания"], "MG": ["Madagascar", "Мадагаскар"], "YT": ["Mayotte", "Майотта"], "MO": ["Macao SAR China", "Макао (САР)"], "MW": ["Malawi", "Малави"], "MY": ["Malaysia", "Малайзия"], "ML": ["Mali", "Мали"], "MV": ["Maldives", "Мальдивы"], "MT": ["Malta", "Мальта"], "MA": ["Morocco", "Марокко"], "MQ": ["Martinique", "Мартиника"], "MH": ["Marshall Islands", "Маршалловы Острова"], "MX": ["Mexico", "Мексика"], "MZ": ["Mozambique", "Мозамбик"], "MD": ["Moldova", "Молдова"], "MC": ["Monaco", "Монако"], "MN": ["Mongolia", "Монголия"], "MS": ["Montserrat", "Монтсеррат"], "MM": ["Myanmar (Burma)", "Мьянма (Бирма)"], "NA": ["Namibia", "Намибия"], "NR": ["Nauru", "Науру"], "NP": ["Nepal", "Непал"], "NE": ["Niger", "Нигер"], "NG": ["Nigeria", "Нигерия"], "NL": ["Netherlands", "Нидерланды"], "NI": ["Nicaragua", "Никарагуа"], "NU": ["Niue", "Ниуэ"], "NZ": ["New Zealand", "Новая Зеландия"], "NC": ["New Caledonia", "Новая Каледония"], "NO": ["Norway", "Норвегия"], "BV": ["Bouvet Island", "о-в Буве"], "IM": ["Isle of Man", "о-в Мэн"], "NF": ["Norfolk Island", "о-в Норфолк"], "CX": ["Christmas Island", "о-в Рождества"], "SH": ["St. Helena", "о-в Св. Елены"], "PN": ["Pitcairn Islands", "о-ва Питкэрн"], "TC": ["Turks & Caicos Islands", "о-ва Тёркс и Кайкос"], "HM": ["Heard & McDonald Islands", "о-ва Херд и Макдональд"], "AE": ["United Arab Emirates", "ОАЭ"], "OM": ["Oman", "Оман"], "KY": ["Cayman Islands", "Острова Кайман"], "CK": ["Cook Islands", "Острова Кука"], "PK": ["Pakistan", "Пакистан"], "PW": ["Palau", "Палау"], "PS": ["Palestinian Territories", "Палестинские территории"], "PA": ["Panama", "Панама"], "PG": ["Papua New Guinea", "Папуа — Новая Гвинея"], "PY": ["Paraguay", "Парагвай"], "PE": ["Peru", "Перу"], "PL": ["Poland", "Польша"], "PT": ["Portugal", "Португалия"], "PR": ["Puerto Rico", "Пуэрто-Рико"], "KR": ["South Korea", "Республика Корея"], "RE": ["Réunion", "Реюньон"], "RU": ["Russia", "Россия"], "RW": ["Rwanda", "Руанда"], "RO": ["Romania", "Румыния"], "SV": ["El Salvador", "Сальвадор"], "WS": ["Samoa", "Самоа"], "SM": ["San Marino", "Сан-Марино"], "ST": ["São Tomé & Príncipe", "Сан-Томе и Принсипи"], "SA": ["Saudi Arabia", "Саудовская Аравия"], "MK": ["North Macedonia", "Северная Македония"], "MP": ["Northern Mariana Islands", "Северные Марианские о-ва"], "SC": ["Seychelles", "Сейшельские Острова"], "BL": ["St. Barthélemy", "Сен-Бартелеми"], "MF": ["St. Martin", "Сен-Мартен"], "PM": ["St. Pierre & Miquelon", "Сен-Пьер и Микелон"], "SN": ["Senegal", "Сенегал"], "VC": ["St. Vincent & Grenadines", "Сент-Винсент и Гренадины"], "KN": ["St. Kitts & Nevis", "Сент-Китс и Невис"], "LC": ["St. Lucia", "Сент-Люсия"], "RS": ["Serbia", "Сербия"], "SG": ["Singapore", "Сингапур"], "SX": ["Sint Maarten", "Синт-Мартен"], "SY": ["Syria", "Сирия"], "SK": ["Slovakia", "Словакия"], "SI": ["Slovenia", "Словения"], "US": ["United States", "Соединенные Штаты"], "SB": ["Solomon Islands", "Соломоновы Острова"], "SO": ["Somalia", "Сомали"], "SD": ["Sudan", "Судан"], "SR": ["Suriname", "Суринам"], "SL": ["Sierra Leone", "Сьерра-Леоне"], "TJ": ["Tajikistan", "Таджикистан"], "TH": ["Thailand", "Таиланд"], "TW": ["Taiwan", "Тайвань"], "TZ": ["Tanzania", "Танзания"], "TG": ["Togo", "Того"], "TK": ["Tokelau", "Токелау"], "TO": ["Tonga", "Тонга"], "TT": ["Trinidad & Tobago", "Тринидад и Тобаго"], "TV": ["Tuvalu", "Тувалу"], "TN": ["Tunisia", "Тунис"], "TM": ["Turkmenistan", "Туркменистан"], "TR": ["Turkey", "Турция"], "UG": ["Uganda", "Уганда"], "UZ": ["Uzbekistan", "Узбекистан"], "UA": ["Ukraine", "Украина"], "WF": ["Wallis & Futuna", "Уоллис и Футуна"], "UY": ["Uruguay", "Уругвай"], "FO": ["Faroe Islands", "Фарерские о-ва"], "FM": ["Micronesia", "Федеративные Штаты Микронезии"], "FJ": ["Fiji", "Фиджи"], "PH": ["Philippines", "Филиппины"], "FI": ["Finland", "Финляндия"], "FK": ["Falkland Islands", "Фолклендские о-ва"], "FR": ["France", "Франция"], "GF": ["French Guiana", "Французская Гвиана"], "PF": ["French Polynesia", "Французская Полинезия"], "TF": ["French Southern Territories", "Французские Южные территории"], "HR": ["Croatia", "Хорватия"], "CF": ["Central African Republic", "Центрально-Африканская Республика"], "TD": ["Chad", "Чад"], "ME": ["Montenegro", "Черногория"], "CZ": ["Czechia", "Чехия"], "CL": ["Chile", "Чили"], "CH": ["Switzerland", "Швейцария"], "SE": ["Sweden", "Швеция"], "SJ": ["Svalbard & Jan Mayen", "Шпицберген и Ян-Майен"], "LK": ["Sri Lanka", "Шри-Ланка"], "EC": ["Ecuador", "Эквадор"], "GQ": ["Equatorial Guinea", "Экваториальная Гвинея"], "ER": ["Eritrea", "Эритрея"], "SZ": ["Eswatini", "Эсватини"], "EE": ["Estonia", "Эстония"], "ET": ["Ethiopia", "Эфиопия"], "GS": ["South Georgia & South Sandwich Islands", "Южная Георгия и Южные Сандвичевы о-ва"], "ZA": ["South Africa", "Южно-Африканская Республика"], "SS": ["South Sudan", "Южный Судан"], "JM": ["Jamaica", "Ямайка"], "JP": ["Japan", "Япония"] }
  professions = [".NET", "1С", "Analyst", "Android", "Architect", "Artist", "Big Data", "Blockchain", "C++", "Data Science", "DBA", "Design", "DevOps", "Drupal", "Embedded", "ERP/CRM", "Finances", "Flutter", "Front End", "Golang", "HR", "iOS/macOS", "Java", "Legal", "Marketing", "Node.js", "Office Manager", "Other", "PHP", "Product Manager", "Project Manager", "Python", "QA", "React Native", "Ruby", "Rust", "Sales", "Salesforce", "Scala", "Security", "SEO", "Support", "SysAdmin", "Technical Writer", "Unity"];
  levels = ["Trainee", "Junior", "Middle", "Senior", "Technical expert", "Industrial expert", "Frontman", "Team lead", "Lead", "Architect"];
  company = [];
  change = (e, searchString, pageNum = 1) => {
    console.log("~~~ change", e, searchString, pageNum)
    const unixTime = Math.floor(Date.now() / 1000);
    if (localStorage.getItem('searchData') !== "undefined" && localStorage.getItem('searchData') !== null) {
      let localData = JSON.parse(localStorage.getItem('searchData'));
      console.log("set in localStorage", localData);
      console.log((localData.searchTerms === searchString) + " && " + (localData.paginated_item >= pageNum) + " && " + ((localData.unixTime + (12 * 60 * 60)) >= unixTime));
      if (localData.searchTerms === searchString && localData.paginated_item >= pageNum && (localData.unixTime + (12 * 60 * 60)) >= unixTime) {
        console.log("set in localStorage", localData);
        this.setState({
          paginated_total: localData.paginated_total,
          paginated_item: localData.paginated_item,
          fetch_data: localData.fetch_data,
        })
        return false;
      }
    };
    // let url='https://www.googleapis.com/customsearch/v1?key=AIzaSyDhHUNF2ydmNUy0pNdkRT6oKpXFBtLqnhc&cx=e0395618f7a764d5c';
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAzRvlDsdCm2KvsFWB1x-jMlJX6y262B1w&cx=d59974c6493a24c3b&q=${searchString + " "}&start=${(pageNum * 10) - 9}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ results: response });
        console.log("response: ", response);
        if (response?.items && response?.items?.length > 0) {
          setGetParameter("page", pageNum)
          let fetch_data = (pageNum > 1) ? this.state.fetch_data.concat(response?.items) : response?.items;
          let queries = response?.queries?.request?.[0];
          const searchData = {
            searchTerms: searchString,
            unixTime: unixTime,
            paginated_total: ((queries?.totalResults / 10) > 10) ? 10 : Math.ceil(queries?.totalResults / 10),
            paginated_item: Math.ceil((queries?.startIndex + 9) / 10),
            fetch_data: fetch_data,
          }
          localStorage.setItem('searchData', JSON.stringify(searchData));
          this.setState({
            paginated_total: ((queries?.totalResults / 10) > 10) ? 10 : Math.ceil(queries?.totalResults / 10),
            paginated_item: Math.ceil((queries?.startIndex + 9) / 10),
            fetch_data: fetch_data,
          })
        }
      }).catch(function (error) {
        console.log(error);
        if (error?.code === 429) console.log("Quota exceeded for quota metric 'Queries' and limit 'Queries per day' ")
      });
  }
  getSearchString = (data = this.state) => {
    let search = '';
    ['q_t', 'q_p', 'q_l', 'q_cc'].forEach(e => {
      if (data?.[e]) search += `${data[e]} `;
    })
    search += (data?.['q_ex']) ? (data['q_ex'].split(' ').map(e => { return `-${e} ` })).join('') : "";
    let c = (data?.['q_c']) ? data['q_c'].toLowerCase() : "*";
    let cc = (data?.['q_c']) ? `(${this.country?.[data['q_c']]?.[0]} OR ${this.country?.[data['q_c']]?.[1]}) AND ` : "";
    search += `${cc}(site:${c}.linkedin.com/in+OR+site:${c}.linkedin.com/pub)`;
    this.setState({ search: search });
    return search;
  }
  setCategory = (k, e) => {
    console.log("~~~setCategory: q_" + k, e)
    this.setState({ [k]: e });
    this.getSearchString();
    setGetParameter(k, e);
  }
  setPaginatedItem = e => {
    this.change(true, this.state.search, e);
  }
  searchSubmit = e => {
    e.preventDefault();
    console.log("searchSubmit", e)
    let search = this.getSearchString();
    this.change(true, search, 1);
  }
  clickSearchLink = (i, link, e) => {
    e.preventDefault();
    if (!link) return false;
    let time = + new Date()
    let s = this.state.search;
    let visit = {
      time: time,
      timeString: timeToString(time),
      searchString: this.state.search,
      link: link
    };
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    console.log("~~~~searchData", searchData);
    searchData.fetch_data[i].visit = visit;
    localStorage.setItem('searchData', JSON.stringify(searchData));
    this.setState({ fetch_data: searchData.fetch_data })
    console.log("~~e: ", i, s, link, e, e.target.href, timeToString(time))
    window.location.replace(link);
  }
  visible = (e) => {
    console.log("@~~~", e)
    this.setState({ next: e });
  }
  render() {
    console.log("state: ", this.state)
    const intl = this.props.intl;
    return (
      <div className="main_wrapper">
        <h1 ><FormattedMessage id="menu_search_api" /> </h1>
        <form onSubmit={this.searchSubmit.bind(this)}>
          <InputSearch placeholder="professions" query={this.state.q_p} data={this.professions} onChange={this.setCategory.bind(this, 'q_p')} />
          <InputSearch placeholder="skill_level" query={this.state.q_l} data={this.levels} onChange={this.setCategory.bind(this, 'q_l')} />
          <InputSearch placeholder="country" query={this.state.q_c} data={Object.keys(this.country)} onChange={this.setCategory.bind(this, 'q_c')} translate={true} onlySelect={true} />
          <InputSearch placeholder="city" query={this.state.q_cc} data={[]} onChange={this.setCategory.bind(this, 'q_cc')} />
          <InputSearch placeholder="exclude" query={this.state.q_ex} data={[]} onChange={this.setCategory.bind(this, 'q_ex')} />
          <input className="search_all_text" defaultValue={this.state.search} />
          <span className="search_rsult_info"><FormattedMessage id="search_rsult_info" values={{ item: this.state.fetch_data.length, total: (this.state.paginated_total * 10) }} /></span><button className="submit_button" type="submit"><FormattedMessage id="find" /></button>
        </form>
        <div className="search_container">
          {this.state.fetch_data.map((key, i) => <div className="search_item" key={i}>
            <div className={"search_image" + ((key?.visit?.time) ? " visit" : "")} style={{ "backgroundImage": "url(" + (key?.pagemap?.cse_thumbnail?.[0]?.src || key?.pagemap?.cse_image?.[0]?.src) + ")" }}></div>
            <a className="search_link" onClick={this.clickSearchLink.bind(this, i, key?.link)} href={key?.link}>
              {1 + i}: {key?.title}
              <p>
                {key?.displayLink}
                {(key?.visit?.time) ? (<span className="visit_popup"><svg width="18" height="18" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M92 46c0 25.405-20.595 46-46 46S0 71.405 0 46 20.595 0 46 0s46 20.595 46 46z" fill="#8cc054" /><path d="M44.137 59.927a2.16 2.16 0 0 1-1.529.632 2.16 2.16 0 0 1-1.529-.632L28.867 47.744a3.229 3.229 0 0 1 0-4.576l1.53-1.525a3.25 3.25 0 0 1 4.587 0l7.624 7.605 20.602-20.55a3.249 3.249 0 0 1 4.588 0l1.529 1.526a3.229 3.229 0 0 1 0 4.575l-25.19 25.128z" fill="#fff" /></svg><div>{key?.visit?.timeString}</div></span>
                ) : ''}
              </p></a>
            <p>{parse(key?.htmlSnippet)}</p>
          </div>)}
          {/* <VisibleEl key={1} keyId={1} visible={this.visible.bind(this)} >~~~~~<i>{this.state.next?"show":"hide"}</i>??</VisibleEl> */}
          <PaginatedItems current={this.state.paginated_item} total={this.state.paginated_total} callback={this.setPaginatedItem.bind(this)} style="more" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  deviceID: state.deviceID,
  currentUser: state.currentUser
})
const mapDispatchToProps = dispatch => ({
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SearchAPI));
