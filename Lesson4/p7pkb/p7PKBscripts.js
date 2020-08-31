
/* 
 ================================================
 PVII Peekaboo scripts
 Copyright (c) 2017 Project Seven Development
 www.projectseven.com
 Version: 1.1.6 -build 10
 ================================================
 
 */

var p7PKB = {
	ctl: [],
	status: false,
	once: false,
	ie: false,
	tch: false,
	flex: false,
	prf: 'none'
};
function P7_PKBset(){
	var h, hd, sh = '';
	if (!document.getElementById) {
		return;
	}
	p7PKB.ie = P7_PKBgetIEver();
	if (sh !== '') {
		hd = document.head || document.getElementsByTagName('head')[0];
		h = document.createElement('style');
		h.type = 'text/css';
		if (h.styleSheet) {
			h.styleSheet.cssText = sh;
		} else {
			h.appendChild(document.createTextNode(sh));
		}
		hd.appendChild(h);
	}
	p7PKB.prf = P7_PKBgetCSSPre();
}

P7_PKBset();
function P7_PKBaddLoad(){
	if (!document.getElementById) {
		return;
	}
	if (window.addEventListener) {
		document.addEventListener("DOMContentLoaded", P7_PKBinit, false);
		window.addEventListener("load", P7_PKBinit, false);
	} else if (window.attachEvent) {
		document.write("<script id=p7ie_pkb defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_pkb").onreadystatechange = function(){
			if (this.readyState == "complete") {
				P7_PKBinit();
			}
		};
		window.attachEvent("onload", P7_PKBinit);
	}
}

P7_PKBaddLoad();
function P7_PKBinit(){
	var i, j, v, el, cl, im, cT, tB, iM, sD, tG, bs, dt, sdb, fn;
	if (p7PKB.once) {
		return;
	}
	p7PKB.once = true;
	if (p7PKB.prf != 'none' && P7_PKBsupports(p7PKB.prf + 'flex-basis') === '') {
		if (p7PKB.ie < 0 || p7PKB.ie > 10) {
			p7PKB.flex = true;
		}
	}
	cT = P7_PKBgetByAttribute('data-pkb', 'p7PKB');
	for (j = 0; j < cT.length; j++) {
		p7PKB.ctl[p7PKB.ctl.length] = cT[j];
		tB = cT[j];
		tB.agmSections = [];
		tB.pkbOpt = tB.getAttribute('data-pkb').split(',');
		P7_PKBremClass(tB, 'pkb-noscript');
		tB.agmState = 'closed';
		if (!p7PKB.flex) {
			P7_PKBsetClass(tB, 'pkb-legacy');
		}
		sD = P7_PKBgetByClass(tB, 'pkb-item', 'DIV');
		for (i = 0; i < sD.length; i++) {
			bs = tB.pkbOpt[1] + tB.pkbOpt[2];
			dt = sD[i].getAttribute('data-pkb-basis');
			if (dt && dt !== '') {
				sdb = dt.split(',');
				bs = sdb[0] + sdb[1];
			}
			if (p7PKB.flex) {
				sD[i].style[p7PKB.prf + 'flex-basis'] = bs;
			} else {
				sD[i].style.width = bs;
			}
			el = P7_PKBgetByClass(sD[i], 'pkb-section', 'DIV');
			if (el && el[0]) {
				el[0].pkbDiv = tB;
				tB.agmSections[tB.agmSections.length] = el[0];
				cl = el[0].getAttribute('class');
				if (/boo-bottom/.test(cl) || /boo-no-animate/.test(cl)) {
					el[0].pkbAnimate = false;
					el[0].pkbState = 'open';
					P7_PKBsetClass(el[0], 'open');
				} else {
					el[0].pkbAnimate = true;
					el[0].pkbState = 'closed';
					if (typeof el[0].ontouchstart !== 'undefined') {
						P7_PKBaddEvent(el[0], 'touchstart', function(evt){
							var tg, m = false;
							evt = (evt) ? evt : event;
							tg = (evt.srcElement) ? evt.srcElement : evt.Target;
							if (P7_PKBevt(evt)) {
								return;
							}
							if (this.pkbMouse) {
								return;
							}
							P7_PKBsetPointer(evt);
							P7_PKBtoggle(this);
						});
						P7_PKBaddEvent(el[0], 'mouseup', function(evt){
							p7PKB.tch = false;
						});
					} else if (navigator.maxTouchPoints) {
						P7_PKBaddEvent(el[0], 'pointerover', function(evt){
							P7_PKBsetPointer(evt);
						});
						P7_PKBaddEvent(el[0], 'pointerdown', function(evt){
							if (P7_PKBevt(evt)) {
								return;
							}
							if (this.pkbMouse) {
								return;
							}
							P7_PKBtoggle(this);
						});
						P7_PKBaddEvent(el[0], 'mouseleave', function(evt){
							p7PKB.tch = false;
						});
					}
					P7_PKBaddEvent(el[0], 'mousedown', function(evt){
						if (this.pkbMouse) {
							return;
						}
						if (p7PKB.tch) {
							return;
						}
						P7_PKBtoggle(this);
					});
					if (tB.pkbOpt[3] == 1) {
						P7_PKBaddEvent(el[0], 'mouseover', function(evt){
							if (p7PKB.tch) {
								return;
							}
							this.pkbMouse = true;
							P7_PKBmouse(this, 'open');
						});
						P7_PKBaddEvent(el[0], 'mouseout', function(evt){
							if (p7PKB.tch) {
								return;
							}
							var tg, m = false;
							evt = (evt) ? evt : event;
							tg = (evt.toElement) ? evt.toElement : evt.relatedTarget;
							while (tg) {
								if (tg.pkbDiv) {
									m = true;
									break;
								}
								if (tg.nodeName && tg.nodeName == 'BODY') {
									break;
								}
								tg = tg.parentNode;
							}
							if (m) {
								return;
							}
							P7_PKBmouse(this, 'close');
						});
					}
				}
			}
		}
	}
}

function P7_PKBopen(el, bp){
	bp = (bp) ? bp : null;
	if (!el.pkbAnimate) {
		return;
	}
	if (el.pkbDiv.pkbOpt[8] == 1 && bp !== 1) {
		P7_PKBall('close');
	}
	el.pkbState = 'open';
	P7_PKBsetClass(el, 'open');
}

function P7_PKBclose(el, bp){
	if (!el.pkbAnimate) {
		return;
	}
	bp = (bp) ? bp : null;
	el.pkbMouse = false;
	el.pkbState = 'closed';
	P7_PKBremClass(el, 'open');
}

function P7_PKBtoggle(el){
	if (el.pkbState == 'open') {
		P7_PKBclose(el);
	} else {
		P7_PKBopen(el);
	}
}

function P7_PKBmouse(el, ac){
	if (ac == 'open' && el.pkbState !== 'open') {
		P7_PKBopen(el);
	} else if (ac == 'close' && el.pkbState !== 'closed') {
		P7_PKBclose(el);
	}
}

function P7_PKBall(ac){
	var i, j, tB;
	for (j = 0; j < p7PKB.ctl.length; j++) {
		tB = p7PKB.ctl[j];
		for (i = 0; i < tB.agmSections.length; i++) {
			if (ac == 'close') {
				if (tB.agmSections[i].agmState !== 'closed') {
					P7_PKBclose(tB.agmSections[i], 1);
				}
			} else if (ac == 'open') {
				if (tB.agmSections[i].agmState !== 'open') {
					P7_PKBopen(tB.agmSections[i], 1);
				}
			}
		}
	}
}

function P7_PKBevt(evt){
	var tg, m = false;
	evt = (evt) ? evt : event;
	tg = (evt.srcElement) ? evt.srcElement : evt.Target;
	while (tg) {
		if (tg.nodeName) {
			if (tg.nodeName == 'A' || tg.nodeName == 'FORM') {
				m = true;
				break;
			}
			if (tg.id && tg.id.indexOf('p7PKB_') > -1) {
				break;
			}
			if (tg.nodeName == 'BODY') {
				break;
			}
		}
		tg = tg.parentNode;
	}
	return m;
}

function P7_PKBgetIEver(){
	var j, k, v = -1, nv;
	nv = navigator.userAgent.toLowerCase();
	j = nv.indexOf("msie");
	if (j > -1) {
		v = parseFloat(nv.substring(j + 4, j + 8));
		if (document.documentMode) {
			v = document.documentMode;
		}
		p7PKB.ie = v;
	}
	j = nv.indexOf('trident/');
	if (j > 0) {
		k = nv.indexOf('rv:');
		v = parseInt(nv.substring(k + 3, nv.indexOf('.', k)), 10);
		p7PKB.ie = v;
	}
	return v;
}

function P7_PKBsetPointer(evt){
	if (evt.pointerType) {
		if (evt.MSPOINTER_TYPE_TOUCH || evt.pointerType == 'touch') {
			p7PKB.tch = true;
		} else if (evt.MSPOINTER_TYPE_PEN || evt.pointerType == 'pen') {
			p7PKB.tch = true;
		} else {
			p7PKB.tch = false;
		}
	} else if (evt.touches && evt.touches.length && evt.touches.length > 0) {
		p7PKB.tch = true;
	} else {
		p7PKB.tch = false;
	}
}

function P7_PKBsetClass(ob, cl){
	if (ob) {
		var cc, nc, r = /\s+/g;
		cc = ob.className;
		nc = cl;
		if (cc && cc.length > 0) {
			if (cc.indexOf(cl) == -1) {
				nc = cc + ' ' + cl;
			} else {
				nc = cc;
			}
		}
		nc = nc.replace(r, ' ');
		ob.className = nc;
	}
}

function P7_PKBremClass(ob, cl){
	if (ob) {
		var cc, nc;
		cc = ob.className;
		cl = cl.replace('-', '\-');
		var re = new RegExp('\\b' + cl + '\\b');
		if (re.test(cc)) {
			nc = cc.replace(re, '');
			nc = nc.replace(/\s+/g, ' ');
			nc = nc.replace(/\s$/, '');
			nc = nc.replace(/^\s/, '');
			ob.className = nc;
		}
	}
}

function P7_PKBgetByClass(el, cls, tg){
	var i, cl, aT, rS = [];
	if (typeof(el.getElementsByClassName) != 'function') {
		aT = el.getElementsByTagName(tg);
		for (i = 0; i < aT.length; i++) {
			cl = aT[i].className;
			if (cl && cl.indexOf(cls) > -1) {
				rS[rS.length] = aT[i];
			}
		}
	} else {
		rS = el.getElementsByClassName(cls);
	}
	return rS;
}

function P7_PKBgetByAttribute(att, cls){
	var i, nL = [], aT, rS = [], cl;
	if (document.querySelectorAll) {
		nL = document.querySelectorAll('*[' + att + ']');
	} else {
		if (typeof(document.getElementsByClassName) != 'function') {
			aT = document.getElementsByTagName('A');
			for (i = 0; i < aT.length; i++) {
				cl = aT[i].className;
				if (cl && cl.indexOf(cls) > -1) {
					rS[rS.length] = aT[i];
				}
			}
		} else {
			rS = document.getElementsByClassName(cls);
		}
		for (i = 0; i < rS.length; i++) {
			if (rS[i].getAttribute(att)) {
				nL[nL.length] = rS[i];
			}
		}
	}
	return nL;
}

function P7_PKBgetCSSPre(){
	var i, dV, pre = ['animationDuration', 'WebkitAnimationDuration'];
	var c = 'none', cssPre = ['', '-webkit-'];
	dV = document.createElement('div');
	for (i = 0; i < pre.length; i++) {
		if (dV.style[pre[i]] !== undefined) {
			c = cssPre[i];
			break;
		}
	}
	return c;
}

function P7_PKBsupports(st){
	return document.createElement('div').style[st];
}

function P7_PKBaddEvent(obj, evt, fn){
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}
