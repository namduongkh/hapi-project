!function n(t,i,e){function o(l,r){if(!i[l]){if(!t[l]){var u="function"==typeof require&&require;if(!r&&u)return u(l,!0);if(a)return a(l,!0);throw new Error("Cannot find module '"+l+"'")}var c=i[l]={exports:{}};t[l][0].call(c.exports,function(n){var i=t[l][1][n];return o(i||n)},c,c.exports,n,t,i,e)}return i[l].exports}for(var a="function"==typeof require&&require,l=0;l<e.length;l++)o(e[l]);return o}({1:[function(n,t,i){"use strict";!function(){angular.module("app",["Jackpot","ngclipboard","GetLink","Common","toastr","angular-loading-bar"]).config(function(n){n.startSymbol("{[{"),n.endSymbol("}]}")})}(),function(){angular.module("Common",[]).config(function(n){n.startSymbol("{[{"),n.endSymbol("}]}")})}(),function(){angular.module("GetLink",[]).config(function(n){n.startSymbol("{[{"),n.endSymbol("}]}")})}(),function(){angular.module("Jackpot",[]).config(function(n){n.startSymbol("{[{"),n.endSymbol("}]}")})}(),function(){function n(){return{publish_email:[{name:"Blog 18 tuổi",value:"openness.newthinkingnewlife.blog18@blogger.com"}]}}angular.module("Common").service("CommonSvc",n)}(),function(){function n(n,t,i,e,o,a,l,r){var u=this;u.showHtml=!1,u.publish_email=l.publish_email,u.has_publish=!1,t.$watch("getImage.view_data",function(n){n&&n.url&&(u.url=n.url,u.getImage(n.url))}),u.getImage=function(n,t){u.has_publish=!1,u.image_data={},a.getImage({url:n}).then(function(n){200==n.status&&n.data.content?(u.image_data={image:n.data.content.image,title:n.data.content.title,html:e.trustAsHtml(n.data.content.image),publish_email:u.publish_email[0].value},o(function(){$("#html-result").find("img").bind("click",function(){this.remove()})}),t&&t()):r.error("Không lấy được dữ liệu hình ảnh!","Lỗi!")}).catch(function(n){console.log("Err",n),r.error("Get image error!","Error!")})},u.getImageManyLink=function(n,t){u.select_publish_email=u.publish_email[0].value,a.getImageManyLink({list_url:n}).then(function(n){200==n.status&&n.data.contents?(u.imageManyLink=n.data.contents.map(function(n){return n.html=e.trustAsHtml(n.image),n}),o(function(){$(".image-many-link").find("img").bind("click",function(){this.remove()})}),t&&t()):r.error("Không lấy được dữ liệu hình ảnh!","Lỗi!")}).catch(function(n){console.log("Err",n),r.error("Get image error!","Error!")})},u.publish=function(n,t,i){a.publish({html:n,email:t,title:i}).then(function(n){200==n.status&&(r.success("Publish success!","Success!"),$(".close-modal").click()),u.has_publish=!0}).catch(function(){r.error("Publish error!","Error!")})},u.publishMany=function(n,t){n=n.map(function(n){return delete n.html,n}),a.publishMany({contents:n,email:t}).then(function(n){200==n.status&&(r.success("Đã xuất bản","Thành công!"),$(".close-modal").click())}).catch(function(){r.error("Publish error!","Error!")})},u.changeShowHtml=function(){u.showHtml=!u.showHtml},i.$on("GET_IMAGE_FROM_LINK",function(n,t){var i=t.url,e=t.cb;i?u.getImage(i,e):r.error("Không tìm thấy url!","Lỗi!")}),i.$on("GET_IMAGE_FROM_MANY_LINK",function(n,t){var i=t.list_url,e=t.cb;i?u.getImageManyLink(i,e):r.error("Không tìm thấy url!","Lỗi!")}),u.removeFromListLink=function(n){u.imageManyLink.splice(n,1),u.imageManyLink.length||$(".close-modal").click()}}angular.module("GetLink").controller("GetImageController",n)}(),function(){function n(n,t,i,e,o,a,l,r){var u=this;u.publish_email=a.publish_email,n.$watch("getLink.view_data",function(n){n&&n.url&&(u.url=n.url,u.getAllLink())}),u.getAllLink=function(){l.getAllLink({url:u.url,not_allow:u.not_allow}).then(function(n){200==n.status&&n.data.status&&(u.allHref=n.data.href,u.listLink=[])}).catch(function(n){console.log("Err",n),r.error("Get all link error!","Error!")})},u.openGetImage=function(n,i){t.$broadcast("GET_IMAGE_FROM_LINK",{url:n,cb:i})},u.openGetImageModal=function(){$("#openGetImage").modal("show")},u.openGetImageManyLinkModal=function(){$("#openGetImageManyLink").modal("show")},u.getImageManyLink=function(n,i){t.$broadcast("GET_IMAGE_FROM_MANY_LINK",{list_url:n,cb:i})},u.changeListLink=function(n,t){u.selectLink[n]?u.listLink.push(t):u.listLink.splice(u.listLink.indexOf(t),1)},u.checkAll=function(){if(u.listLink=[],u.selectLink=[],u.checkAllLink)for(var n in u.allHref)u.selectLink[n]=!0,u.changeListLink(n,u.allHref[n])}}angular.module("GetLink").controller("GetLinkController",n)}(),function(){function n(n){return{publish:function(t){return n({method:"post",url:"/api/getlink/publish",data:t})},publishMany:function(t){return n({method:"post",url:"/api/getlink/publishMany",data:t})},getImage:function(t){return n({method:"post",url:"/api/getlink/getImage",data:t})},getImageManyLink:function(t){return n({method:"post",url:"/api/getlink/getImageManyLink",data:t})},getAllLink:function(t){return n({method:"post",url:"/api/getlink/getAllLink",data:t})}}}angular.module("GetLink").service("GetLinkSvc",n)}(),function(){function n(n,t){var i=this;i.winnings=[],i.getWinningPosition=function(t){n({method:"post",url:"/api/jackpot/getWinningPosition",data:{position:t}}).then(function(n){i.winnings[t]=n.data})},i.getWinnings=function(){for(var n=0;n<6;n++)i.getWinningPosition(n)},i.addWinning=function(){n({method:"post",url:"/api/jackpot/addWinningApi",data:{number:i.add_winning.number,date:i.add_winning.date}}).then(function(n){console.log("Resp",n)})}}angular.module("Jackpot").controller("JackpotController",n)}()},{}]},{},[1]);