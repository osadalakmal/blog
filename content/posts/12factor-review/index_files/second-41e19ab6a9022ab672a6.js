_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[17],{Lqic:function(t,e,n){"use strict";n.r(e);var a=n("q1tI"),o=n.n(a),r=n("/MKj"),c=n("FMot"),i=n("ouWO"),u=n("dWgv"),s=n("4bJj"),l=n("nOHt"),m=n("RF+8"),p=n("wEEd"),x=o.a.createElement,f=Object(r.b)((function(t,e){return{}}),(function(t){return{}}))((function(t){var e=t.onCompletion,n=Object(p.c)({opacity:1,transform:"translate(0,0)",from:{opacity:0,transform:"translate(0,15px)"}});return x(p.a.div,{style:n,className:"w-screen h-screen flex items-center justify-center bg-teapotBackground text-teapotText"},x("section",{className:"flex flex-col items-center justify-center max-w-xl px-1"},x("h2",{className:"text-3xl lg:text-5xl"},"Welcome to MojoUpgrade."),x("h3",{className:"text-2xl lg:text-4xl"},"You have been invited to take this quiz by your partner."),x(m.a,null),x("h4",null,"How it works"),x("p",{className:"text-xl lg:text-3xl my-6 text-gray-700"},"Answer questions on what you want. ",x("br",null),"Your partner answers questions on what they want. ",x("br",null),"We'll show you where you both ",x("span",{className:"italic"},"match")),x("button",{className:"py-3 px-6 bg-teapotAccent rounded text-white text-xl lg:text-3xl",onClick:e},"Start")))})),w=n("GLcc"),d=o.a.createElement,b=Object(r.b)((function(t,e){return{partner1Nickname:t.quiz.participant1Nickname}}),(function(t){return{}}))((function(t){var e=t.onCompletion,n=t.partner1Nickname,a=Object(p.c)({opacity:1,transform:"translate(0,0)",from:{opacity:0,transform:"translate(0,15px)"},config:p.b.stiff});return d(p.a.div,{style:a,className:"w-screen h-screen flex items-center justify-center bg-teapotBackground text-teapotText"},d("section",{className:"flex flex-col items-center justify-center max-w-xl px-1"},d("h2",{className:"text-3xl lgtext-5xl text-center"},"You and ",n||"your partner"," have finished the quiz!"),d(m.a,null),d("p",{className:"text-xl lg:text-3xl my-6 text-gray-700"},"Are you ready to see where you match? Let joe know that it is time to view the"),d("button",{className:"py-3 px-6 bg-teapotAccent rounded text-white text-xl lg:text-3xl",onClick:e},"Results")))})),y=n("sLRT"),h=o.a.createElement;e.default=Object(r.b)((function(t,e){return{participantId:t.quiz.participant2Id}}),(function(t){return{getQuizInfo:function(e){return t(Object(w.j)(e))}}}))((function(t){var e=t.participantId,n=t.getQuizInfo,r=Object(a.useState)("welcome"),m=r[0],p=r[1],x=Object(l.useRouter)(),w=Object(y.a)().trackPageViewed;Object(a.useEffect)((function(){x.query.slug&&n(x.query.slug).then((function(t){var e=t.payload,n=e.status,a=e.participant1Nickname;switch(n){case"awaiting_results_view":case"results":p("endtransition");break;default:p(a?"quiz":"welcome")}}))}),[x.query.slug]),Object(a.useEffect)((function(){window.scrollTo(0,0)}),[m]),Object(a.useEffect)((function(){m&&w("".concat(window.location.pathname,"#").concat(m))}),[m]);return h(o.a.Fragment,null,e&&h(o.a.Fragment,null,h("div",{className:"z-20 absolute"},h(c.a,null)),"welcome"===m&&h(f,{onCompletion:function(){return p("nickname")}}),"nickname"===m&&h(i.a,{onCompletion:function(){return p("quiz")}}),"quiz"===m&&h(u.a,{onCompletion:function(){return p("rank")}}),"rank"===m&&h(s.a,{onCompletion:function(){return p("endtransition")}}),"endtransition"===m&&h(b,{onCompletion:function(){x.push({pathname:"/results",query:{slug:x.query.slug}})}})))}))},zr9u:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/second",function(){return n("Lqic")}])}},[["zr9u",0,1,2,3,4,5,6,7]]]);