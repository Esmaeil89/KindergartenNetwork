using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using kindergartenNetwork.Helper;
using kindergartenNetwork.Models;
using kindergartenNetwork.Models.NewsModels;

namespace kindergartenNetwork.Controllers
{
    public class HomeController : Controller
    {
        private readonly kindergartenNetworkEntities _db = new kindergartenNetworkEntities();
        public ActionResult Index()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = _db.StaticPages.First(x => x.Id == 1);
            return View(oModel);
        }

        public ActionResult About()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = _db.StaticPages.First(x => x.Id == 2);
            return View(oModel);
        }

        public ActionResult Contact()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = _db.StaticPages.First(x => x.Id == 3);
            return View(oModel);
        }
        [ValidateOnlyIncomingValues]
        public JsonResult SaveContactUs([Bind(Exclude = "Reply")] ContactU oContactUs)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var result = _db.ContactUs.Add(oContactUs);
                if (result.Id > 0)
                {
                    cStatus = "success";
                    cMsg = kindergartenNetwork.Resources.NotifyMsg.SuccessMsg;
                    return Json(new { cStatus = cStatus, cMsg = cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
    }
}