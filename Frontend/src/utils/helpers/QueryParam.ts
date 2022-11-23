import { Pagination } from '../constants/Constants';
const _ = require('lodash');

export const ITypePagination = {
  page: "page",
  numberOfPage: "numberOfPage",
};


const onChangeNumberOfPage = (sizePage: number) => {
  const numberOfPage = Pagination.numberOfPageDefault;

  if (Number(sizePage) > Number(_.max(numberOfPage))) return Number(_.max(numberOfPage));

  if (Number(sizePage) < Number(_.min(numberOfPage))) return Number(_.min(numberOfPage));

  if (!_.includes(numberOfPage, Number(sizePage))) return Number(_.min(numberOfPage));

  return Number(sizePage);
};

const handleCheck = (value: string) => {
  return /^\d$/.test(value);
};

const onChangePage = (props: any) => {

  if (props.pageTotal) {
    if (Number(props.pageTotal) >= Number(props.page)) {
      return Number(props.page) !== 0 ? Number(props.page) : Pagination.pageDefault;
    }
    if (Number(props.pageTotal) <= Number(props.page)) {
      return 1;
    }
  }
  if (!handleCheck(props.page)) {
    return 1;
  }
  return Number(props.page) > 0 ? Number(props.page) : Pagination.pageDefault;
};

export const handelQueryParamUrl = (props: any) => {
  localStorage.setItem("pageTotal", props.pageTotal);
  props.history.push({
    pathname: props.pathname,
    search: `${props.id ? `?id=${props.id}` : ''}${props.id ? `&` : '?'}page=${Number(props.page) > 0 ? props.page : 1}&numberOfPage=${onChangeNumberOfPage(props.numberOfPage)}`,
  });
};

export const handelGetQueryParams = (props: any) => {
  return props.queryParam === "page"
    ? onChangePage({
      page: Number(props.query.get(props.queryParam)) > 0 ? Number(props.query.get(props.queryParam)) : 1,
      pageTotal: localStorage.getItem("pageTotal") ? localStorage.getItem("pageTotal") : 1,
    })
    : onChangeNumberOfPage(props.query.get(props.queryParam));
};

const checkPage = (page: any, metadata: any, history: any, pathname: any, id: any) => {
  if (page && Number(page) > 0) {
    return Number(page)
  } else {
    let search = `${id ? `?id=${id}` : ''}${id ? `&` : '?'}page=1&numberOfPage=${onChangeNumberOfPage(metadata.Paging.NumberOfPage)}`;
    history.push({
      pathname: pathname ? pathname : '',
      search: search,
    });
    return 1
  }
}


export const saveMetadata = (metadata: any, setMetadata: any, history: any, pathname: any, id?: any, type?: any) => {
  let params = window.location.search
  var listParams = params.split('&')
  if (type) {
    var indexType = listParams.findIndex((item) => item.includes(type))
    let type_ = listParams[indexType].split(`${type}=`)
    metadata.Paging[`${type}`] = type_[1];
  }
  var indexPage = listParams.findIndex((item) => item.includes('page'))
  var indexTotalPages = listParams.findIndex((item) => item.includes('numberOfPage'))
  let page = listParams[indexPage].split('page=')
  let numberOfPage = listParams[indexTotalPages].split('numberOfPage=')
  metadata.Paging.NumberOfPage = numberOfPage[1] ? numberOfPage[1] : 10;
  metadata.Paging.Page = checkPage(page[1], metadata, history, pathname, id);

  setMetadata({ ...metadata });
};



// export const backLink = () => {
//   return window.open(`${window.location.origin}/auth?path=${window.location.pathname}${window.location.search}`, "_self")
// }