using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using kindergartenNetwork.Models;

namespace kindergartenNetwork.Controllers
{
    public class LoginController : Controller
    {
        private static kindergartenNetworkEntities db = new kindergartenNetworkEntities();

        // GET: Login
        public ActionResult Index(string returnUrl)
        {
            //if (MadarUser != null)
            //    return RedirectToAction("Index", "Dashboard");
            ViewBag.returnUrl = returnUrl;
            return View();
        }
        public ActionResult LoginRedirect(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;
            return View();
        }
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("LoginRedirect", "Login", Request.Url);
        }
        public JsonResult Login(LoginModel oUserAccount)
        {
            var cStatus = "error";
            var cMsg = "User Name or Password invalid";

            if (string.IsNullOrEmpty(oUserAccount.Email) || string.IsNullOrEmpty(oUserAccount.Password))
            {
                return Json(new { cStatus = "error", cMsg = "You cant Enter empty username or password !!" });
            }
            
            var getUserAccount = db.UserAccounts.Where(x=> (x.Email == oUserAccount.Email || x.Name == oUserAccount.Email) && x.Pass == oUserAccount.Password).ToList();
            if (getUserAccount.Count > 0)
            {
                // ReSharper disable once AssignNullToNotNullAttribute
                var getUserAccountResult = getUserAccount.FirstOrDefault();
                cStatus = "success";
                cMsg = "انتهت العملية بنجاح";
                if (getUserAccountResult?.IsActive != null && getUserAccountResult.IsActive && !getUserAccountResult.IsDeleted)
                {
                    CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                    serializeModel.Id = getUserAccountResult.Id;
                    serializeModel.Name = getUserAccountResult.Name;
                    serializeModel.Password = getUserAccountResult.Pass;
                    if (getUserAccountResult.UserTypeId != null)
                        serializeModel.UserTypeId = getUserAccountResult.UserTypeId.Value;
                    //if (getUserAccountResult.BranchId != null)
                    //    serializeModel.BranchId = getUserAccountResult.BranchId.Value;
                    serializeModel.Email = getUserAccountResult.Email;
                    serializeModel.Avatar = getUserAccountResult.Avatar;
                    //serializeModel.UserTypeName = getUserAccountResult.UserTypeName;
                    serializeModel.IsActive = getUserAccountResult.IsActive;
                    serializeModel.IsDeleted = getUserAccountResult.IsDeleted;
                    serializeModel.Gender = getUserAccountResult.Gender;
                    serializeModel.Mobile = getUserAccountResult.Mobile;
                    serializeModel.EmailPassword = getUserAccountResult.EmailPassword;

                    string userData = JsonConvert.SerializeObject(serializeModel);
                    HttpCookie cookie = FormsAuthentication.GetAuthCookie(serializeModel.Name, false);
                    var ticket = FormsAuthentication.Decrypt(cookie.Value);
                    if (ticket != null)
                    {
                        var newticket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate, ticket.Expiration, true, userData, ticket.CookiePath);
                        cookie.Value = FormsAuthentication.Encrypt(newticket);
                        if (oUserAccount.Remember == 1)
                        {
                            cookie.Expires = newticket.Expiration.AddYears(2);
                        }
                    }

                    string url = "";
                    HttpContext.Response.Cookies.Set(cookie);
                    
                        url = Url.Action("index", "ControlPanel");
                    
                    //if (getUserAccountResult.userType == 9 || LogInUser.userType == 14)
                    //{
                    //    URL = Url.Action("Index", "CMProducts");
                    //}
                    //FormsAuthentication.RedirectFromLoginPage(LogInUser.Account + "\n" + LogInUser.Type + "\n" + LogInUser.isActive, false);
                    return Json(new { cStatus, cMsg, isRedirect = true, redirectUrl = (string.IsNullOrEmpty(oUserAccount.ReturnUrl) ? url : oUserAccount.ReturnUrl) }, JsonRequestBehavior.AllowGet);

                }
                else if (getUserAccountResult != null && getUserAccountResult.IsDeleted)
                {
                    cStatus = "error";
                    cMsg = "The account is deactivated, please contact Admin";
                }
                else
                {
                    cStatus = "error";
                    cMsg = "The account is deactivated, please contact Admin";
                }
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
    }
}