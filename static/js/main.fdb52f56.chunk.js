(this["webpackJsonpnew-story-metrics-dashboard"]=this["webpackJsonpnew-story-metrics-dashboard"]||[]).push([[0],{18:function(e,t,n){e.exports=n(50)},23:function(e,t,n){},24:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),l=n.n(c),u=(n(23),n(24),n(2)),i=n(3),s=n(4),d=n.n(s),o=n(5),m=n.n(o),f=n(17),A=n(6),p=n.n(A),g=function(e,t,n,a,r){var c=d()().subtract(t[1],"days").format("YYYY-MM-DD"),l={};Object.keys(e).forEach((function(t){var n=e[t].filter((function(e){var t=e.createdAt.indexOf("T");return e.createdAt.substring(0,t)>c}));l[t]=n})),n(l);var u=2*t[1],i=d()().subtract(u,"days").format("YYYY-MM-DD"),s={};Object.keys(e).forEach((function(t){var n=e[t].filter((function(e){var t=e.createdAt.indexOf("T"),n=e.createdAt.substring(0,t);return n>i&&n<c}));s[t]=n})),a(s);var o={};Object.keys(e).forEach((function(t){var n=e[t].filter((function(e){var t=e.createdAt.indexOf("T");return e.createdAt.substring(0,t)<c}));o[t]=n})),r(o)},b={signInUser:function(){var e=Object(f.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("https://api-dev.newstory.io/graphql",{query:'\n                mutation { signInUser(email: "emauldin84@gmail.com", password:"thrivenotsurvive"){\n                token\n                viewer { \n                    uuid \n                    email \n                    firstName \n                    lastName \n                } \n            } \n        }\n        '},{headers:{"X-Api-Key":"54125abed83236f363b8330eefe6f4e3","Content-Type":"application/json"}}).then((function(e){t(e.data.data.signInUser.token)})).catch((function(e){throw e}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setCompData:g,fetchData:function(e,t,n,a,r,c,l){p.a.post("https://api-dev.newstory.io/graphql",{query:"\n        query {\n            users {\n                uuid\n                username\n                createdAt\n                lastSignInAt\n                comments {\n                    createdAt\n                    updatedAt\n                }\n                createdTasks {\n                    createdAt\n                    updatedAt\n                }\n            }\n            organizations{\n                name\n                createdAt\n                users {\n                    uuid\n                    username\n                    lastSignInAt\n                }\n                comments {\n                    createdAt\n                    updatedAt\n                }\n                questions {\n                    createdAt\n                    updatedAt\n                }\n                surveys {\n                    createdAt\n                    updatedAt\n                    changedAt\n                }\n                tasks{\n                    createdAt\n                    updatedAt\n                    completedAt\n                    }\n            }\n            recipients{\n                uuid\n                name\n                createdAt\n                updatedAt\n            }\n            submissions {\n                uuid\n                createdAt \n            }\n        }\n        "},{headers:{Authorization:e,"X-Api-Key":"54125abed83236f363b8330eefe6f4e3","Content-Type":"application/json"}}).then((function(e){n(e.data.data),g(e.data.data,t,a,r,c),l(!1)})).catch((function(e){throw e}))}},h=(n(44),n(45),function(e){console.log(e.metrics,"metricsData",e.metricsData);var t=Object.keys(e.metricsData).map((function(t){var n=e.metricsData[t].current,a=Math.abs(e.metricsData[t].comparison),c=n-a,l=c>0?"comparison positive":c<0?"comparison negative":"comparison",u=c>0?"\u2191":c<0?"\u2193":null,i=0===c&&0===a?(0).toFixed(2):(Math.abs(c)/Math.abs(a)*100).toFixed(2);console.log("compPerc",i);var s=Math.abs(n)>0&&0===a?"*":null;return r.a.createElement("div",{key:t,className:"metric-inline-display"},r.a.createElement("div",{className:"metric-title-container"},r.a.createElement("p",null,t[0].toUpperCase()+t.substring(1)," ",e.metrics[0].toUpperCase()+e.metrics.substring(1))),r.a.createElement("div",{className:"metric-data-container"},r.a.createElement("p",{className:"current"},n),r.a.createElement("p",{className:l},u,i,"%",s)))}));return r.a.createElement("div",{className:"container"},r.a.createElement("div",{id:e.metrics,className:"metric-container ".concat(e.metrics,"-container"),onClick:e.handleMetricClick},t))}),v=(n(46),function(e){var t="month"===e.frequency[0]?"active frequency month":"frequency month",n="quarter"===e.frequency[0]?"active frequency quarter":"frequency quarter",a="year"===e.frequency[0]?"active frequency year":"frequency year";return r.a.createElement("div",{className:"comparison-container"},r.a.createElement("p",{className:"frequency-title"},"Comparison Frequency"),r.a.createElement("div",{className:"frequency-selector"},r.a.createElement("p",{className:t,onClick:function(){return e.handleFrequencyClick(["month",30])}},"month"),r.a.createElement("p",{className:"divider"},"|"),r.a.createElement("p",{className:n,onClick:function(){return e.handleFrequencyClick(["quarter",91])}},"quarter"),r.a.createElement("p",{className:"divider"},"|"),r.a.createElement("p",{className:a,onClick:function(){return e.handleFrequencyClick(["year",365])}},"year")))}),O=(n(47),function(){return r.a.createElement("div",{className:"key-container"},r.a.createElement("p",null,"* Percent change from zero"))}),y=(n(48),function(){return r.a.createElement("div",{className:"loader-backdrop"},r.a.createElement("div",{className:"loader"}),r.a.createElement("div",{className:"loader-text"},"Fetching..."))}),E=(n(49),function(e){return r.a.createElement("div",{className:"refresh",title:"refresh data",onClick:function(){e.setFetching(!0),e.fetchData()}},"\u27f3")}),x=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)([]),s=Object(i.a)(l,2),o=s[0],m=s[1],f=Object(a.useState)([]),A=Object(i.a)(f,2),p=A[0],g=A[1],x=Object(a.useState)([]),T=Object(i.a)(x,2),j=T[0],k=T[1],q=Object(a.useState)(["month",30]),N=Object(i.a)(q,2),S=N[0],w=N[1],I=Object(a.useState)(null),D=Object(i.a)(I,2),C=D[0],Y=D[1],M=Object(a.useState)(!0),F=Object(i.a)(M,2),z=F[0],U=F[1];Object(a.useEffect)((function(){b.signInUser(Y)}),[]),Object(a.useEffect)((function(){C&&b.setCompData(n,S,m,g,k)}),[C,S]),Object(a.useEffect)((function(){C&&B()}),[C]);var B=function(){b.fetchData(C,S,c,m,g,k,U)},J={},K=[],P=[],W=[],X=[];Object.keys(n).forEach((function(e){var t=d()().subtract(S[1],"days").format("YYYY-MM-DD"),a=d()().subtract(2*S[1],"days").format("YYYY-MM-DD");"users"===e&&(K=n[e].filter((function(e){var n=e.lastSignInAt?e.lastSignInAt.indexOf("T"):null,a=e.lastSignInAt?e.lastSignInAt.substring(0,n):null,r=e.comments.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,a=e.createdAt?e.createdAt.substring(0,n):null,r=e.updatedAt?e.updatedAt.indexOf("T"):null,c=e.updatedAt?e.updatedAt.substring(0,r):null;return a>t||c>t})),c=e.createdTasks.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,a=e.createdAt?e.createdAt.substring(0,n):null,r=e.updatedAt?e.updatedAt.indexOf("T"):null,c=e.updatedAt?e.updatedAt.substring(0,r):null;return a>t||c>t}));return a>t||r.length>0||c.length>0})),P=n[e].filter((function(e){var n=e.lastSignInAt?e.lastSignInAt.indexOf("T"):null,r=e.lastSignInAt?e.lastSignInAt.substring(0,n):null,c=e.comments.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,r=e.createdAt?e.createdAt.substring(0,n):null,c=e.updatedAt?e.updatedAt.indexOf("T"):null,l=e.updatedAt?e.updatedAt.substring(0,c):null;return r>a&&r<t||l>a&&r<t})),l=e.createdTasks.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,r=e.createdAt?e.createdAt.substring(0,n):null,c=e.updatedAt?e.updatedAt.indexOf("T"):null,l=e.updatedAt?e.updatedAt.substring(0,c):null;return r>a&&r<t||l>a&&r<t}));return r>a&&r<t||c.length>0||l.length>0}))),"organizations"===e&&(W=n[e].map((function(e){var n=e.users.filter((function(e){var n=e.lastSignInAt?e.lastSignInAt.indexOf("T"):null;return(e.lastSignInAt?e.lastSignInAt.substring(0,n):null)>t})),a=e.comments.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,a=e.createdAt?e.createdAt.substring(0,n):null,r=e.updatedAt?e.updatedAt.indexOf("T"):null,c=e.updatedAt?e.updatedAt.substring(0,r):null;return a>t||c>t})),r=e.questions.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,a=e.createdAt?e.createdAt.substring(0,n):null,r=e.updatedAt?e.updatedAt.indexOf("T"):null,c=e.updatedAt?e.updatedAt.substring(0,r):null;return a>t||c>t})),c=e.surveys.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,a=e.createdAt?e.createdAt.substring(0,n):null,r=e.updatedAt?e.updatedAt.indexOf("T"):null,c=e.updatedAt?e.updatedAt.substring(0,r):null,l=e.changedAt?e.changedAt.indexOf("T"):null,u=e.changedAt?e.changedAt.substring(0,l):null;return a>t||c>t||u>t})),l=e.tasks.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,a=e.createdAt?e.createdAt.substring(0,n):null,r=e.updatedAt?e.updatedAt.indexOf("T"):null,c=e.updatedAt?e.updatedAt.substring(0,r):null,l=e.completedAt?e.completedAt.indexOf("T"):null,u=e.completedAt?e.completedAt.substring(0,l):null;return a>t||c>t||u>t}));return[].concat(Object(u.a)(n),Object(u.a)(a),Object(u.a)(r),Object(u.a)(c),Object(u.a)(l))})).filter((function(e){return e.length>=1})),X=n[e].map((function(e){var n=e.users.filter((function(e){var n=e.lastSignInAt?e.lastSignInAt.indexOf("T"):null,r=e.lastSignInAt?e.lastSignInAt.substring(0,n):null;return r>a&&r<t})),r=e.comments.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,r=e.createdAt?e.createdAt.substring(0,n):null,c=e.updatedAt?e.updatedAt.indexOf("T"):null,l=e.updatedAt?e.updatedAt.substring(0,c):null;return r>a&&r<t||l>a&&l<t})),c=e.questions.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,r=e.createdAt?e.createdAt.substring(0,n):null,c=e.updatedAt?e.updatedAt.indexOf("T"):null,l=e.updatedAt?e.updatedAt.substring(0,c):null;return r>a&&r<t||l>a&&l<t})),l=e.surveys.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,r=e.createdAt?e.createdAt.substring(0,n):null,c=e.updatedAt?e.updatedAt.indexOf("T"):null,l=e.updatedAt?e.updatedAt.substring(0,c):null,u=e.changedAt?e.changedAt.indexOf("T"):null,i=e.changedAt?e.changedAt.substring(0,u):null;return r>a&&r<t||l>a&&l<t||i>a&&i<t})),i=e.tasks.filter((function(e){var n=e.createdAt?e.createdAt.indexOf("T"):null,r=e.createdAt?e.createdAt.substring(0,n):null,c=e.updatedAt?e.updatedAt.indexOf("T"):null,l=e.updatedAt?e.updatedAt.substring(0,c):null,u=e.completedAt?e.completedAt.indexOf("T"):null,i=e.completedAt?e.completedAt.substring(0,u):null;return r>a&&r<t||l>a&&l<t||i>a&&i<t}));return[].concat(Object(u.a)(n),Object(u.a)(r),Object(u.a)(c),Object(u.a)(l),Object(u.a)(i))})).filter((function(e){return e.length>=1}))),J[e]=o[e]&&p[e]&&j[e]?"organizations"===e||"users"===e?{active:{current:"organizations"===e?W.length:K.length,comparison:"organizations"===e?X.length:P.length},new:{current:o[e].length,comparison:p[e].length},total:{current:n[e].length,comparison:j[e].length}}:{new:{current:o[e].length,comparison:p[e].length},total:{current:n[e].length,comparison:j[e].length}}:null}));var L=Object.keys(J).map((function(e){return r.a.createElement(h,{key:e,metrics:e,metricsData:J[e],frequency:S})})),V=z?r.a.createElement(y,null):r.a.createElement("div",null,L,r.a.createElement(O,null));return r.a.createElement("div",{className:"dashboard-container"},r.a.createElement("div",{className:"logo-refresh-container"},r.a.createElement("div",{className:"logo-container"},r.a.createElement("a",{href:"https://newstorycharity.org/",target:"_blank"},r.a.createElement("img",{className:"logo",alt:"New Story Logo",src:"https://360kk73nf60j1amgkj11crnq-wpengine.netdna-ssl.com/wp-content/themes/newstory/src/img/logo.png"}))),r.a.createElement(E,{fetchData:B,setFetching:U})),r.a.createElement(v,{handleFrequencyClick:function(e){e[1]!==S[1]&&w(e)},frequency:S}),r.a.createElement("div",{className:"title-display"},r.a.createElement("p",{className:"titles",id:"title-metric"},r.a.createElement("b",null,"Metric")),r.a.createElement("p",{className:"titles",id:"title-value"},r.a.createElement("b",null,"Value")),r.a.createElement("p",{className:"titles",id:"title-comparison"},r.a.createElement("b",null,"Comparison"))),V)},T=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(x,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.fdb52f56.chunk.js.map