import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import pl from "javascript-time-ago/locale/pl.json";

TimeAgo.addLocale(pl);
TimeAgo.addLocale(en);
TimeAgo.setDefaultLocale(pl.locale);

export default TimeAgo;
