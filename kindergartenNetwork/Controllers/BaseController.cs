using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using Newtonsoft.Json;
using System.Globalization;
using System.Threading;
using kindergartenNetwork.Models;

namespace kindergartenNetwork.Controllers
{
    [RoutePrefix("DefaultLocalized")]
    public class BaseController : Controller
    {
        private static kindergartenNetworkEntities db = new kindergartenNetworkEntities();
        public int LangId { get; set; }
        public string DefaultTimeZone { get; set; }
        protected virtual new CustomPrincipal User => HttpContext.User as CustomPrincipal;
        protected override void OnAuthorization(AuthorizationContext filterContext)
        {
            string pageLink = filterContext.RouteData.Values["controller"] + "/" + filterContext.RouteData.Values["action"];

            var getPages = db.Pages.Where(x=>x.Link == pageLink).ToList();
            if (getPages.Count > 0)
            {
                var getPageResult = getPages.FirstOrDefault();
                if (filterContext.HttpContext.Request.IsAuthenticated)
                {
                    var fileContents = System.IO.File.ReadAllText(Server.MapPath(@"~/App_Data/Language.json"));
                    var languages = JsonConvert.DeserializeObject<List<Models.Common.LanguageModel>>(fileContents);
                    //var Langob = languages.Find(q => q.TowLetterCode.ToLower() == "ar");
                    var langob = languages.Find(q => q.TowLetterCode.ToLower() == Convert.ToString(filterContext.RouteData.Values["lang"] ?? "ar").ToLower());
                    filterContext.Controller.ViewData["User"] = User;
                    filterContext.Controller.ViewData["PageTitle"] = langob.Id == 1 ? getPageResult.Name : getPageResult.NameEn;
                    ViewBag.UserTypeId = User.UserTypeId;
                    if (getPageResult.NeedLogin)
                    {
                        

                        if (!db.UserTypePages.Any(x => x.PageId == getPageResult.Id && x.UserTypeId == User.UserTypeId))
                        {
                            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "System", action = "AccessDenied" }));
                        }
                    }
                }
                else
                {
                    if (getPages.Count > 0)
                    {
                        if (getPageResult.NeedLogin)
                        {
                            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Login", action = "LoginRedirect", returnUrl = Request.Url }));
                        }
                    }
                    else
                    {
                        filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Login", action = "LoginRedirect", returnUrl = Request.Url }));
                    }

                }
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(new
                RouteValueDictionary(new { controller = "System", action = "AccessDenied" }));
            }
        }
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var fileContents = System.IO.File.ReadAllText(Server.MapPath(@"~/App_Data/Language.json"));
            var languages = JsonConvert.DeserializeObject<List<Models.Common.LanguageModel>>(fileContents);
            //var Langob = languages.Find(q => q.TowLetterCode.ToLower() == "ar");
            var Langob = languages.Find(q => q.TowLetterCode.ToLower() == Convert.ToString(filterContext.RouteData.Values["lang"] ?? "ar").ToLower());
            ViewBag.LangId = Langob.Id;
            LangId = Langob.Id;
            ViewBag.LangCode = Langob.Code;
            ViewBag.LangDir = Langob.Dir;
            ViewBag.LangTowLetterCode = Langob.TowLetterCode;
            ViewBag.LangName = Langob.Name;

            //CultureInfo newCulture = new CultureInfo(ViewBag.LangTowLetterCode);
            //newCulture.DateTimeFormat.ShortDatePattern = "dd-MM-yyyy";
            //newCulture.DateTimeFormat.DateSeparator = "-";
            //Thread.CurrentThread.CurrentCulture = Thread.CurrentThread.CurrentUICulture = newCulture;
        }
    }

}
