
/* 
 ================================================
 PVII Accordian Panel Magic 4 scripts
 Copyright (c) 2017 Project Seven Development
 www.projectseven.com
 Version: 4.1.5 -build 13
 ================================================
 
 */
var p7AP4 = {
	imOver: '_over',
	imOpen: '_down',
	ctl: [],
	status: false,
	once: false,
	init: false,
	ie: false,
	prf: 'none',
	clk: false,
	defAnim: 1,
	defDuration: 500,
	tchEl: null,
	frameRate: (1000 / 60)
};
function P7_AP4set(){
	var h, sh, hd, x, v;
	if (!document.getElementById) {
		return;
	}
	sh = '.p7AP4cwrapper {height:0px;overflow:hidden;}\n';
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
	p7AP4.prf = P7_AP4getCSSPre();
}

P7_AP4set();
function P7_AP4addLoad(){
	if (!document.getElementById) {
		return;
	}
	if (window.addEventListener) {
		document.addEventListener("DOMContentLoaded", P7_initAP4, false);
		window.addEventListener("load", P7_initAP4, false);
		window.addEventListener("unload", P7_AP4ff, false);
	} else if (window.attachEvent) {
		document.write("<script id=p7ie_ap4 defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_ap4").onreadystatechange = function(){
			if (this.readyState === "complete") {
				if (p7AP4.ctl.length > 0) {
					P7_initAP4();
				}
			}
		};
		window.attachEvent("onload", P7_initAP4);
	}
}

P7_AP4addLoad();
function P7_AP4ff(){
	return;
}

function P7_opAP4(){
	if (!document.getElementById) {
		return;
	}
	p7AP4.ctl[p7AP4.ctl.length] = arguments;
}

function P7_initAP4(){
	var i, j, k, el, tB, tA, tC, iM, sr, x, fnA, fnB, swp, s1, s2, ob, tr, tp, tBR, tBW, cl;
	if (p7AP4.once) {
		return;
	}
	p7AP4.once = true;
	document.p7AP4preload = [];
	for (i = 0; i < p7AP4.ctl.length; i++) {
		tB = document.getElementById(p7AP4.ctl[i][0]);
		if (tB) {
			tB.p7opt = p7AP4.ctl[i];
			if (navigator.appVersion.indexOf("MSIE 5") > -1) {
				tB.p7opt[2] = 0;
			}
			tB.ap4Cont = [];
			tB.ap4Trigs = [];
			tB.ap4StartTime = 0;
			tB.ap4Duration = tB.p7opt[12];
			tp = 'linear';
			if (tB.p7opt[2] === 2) {
				tp = 'quad';
			} else if (tB.p7opt[2] === 3) {
				tp = 'bounce';
				tB.ap4Duration = tB.p7opt[12] * 2;
			}
			tB.ap4AnimType = tp;
			P7_AP4remClass(tB, 'ap4-noscript');
			if (P7_AP4supports(p7AP4.prf + 'flex-basis') !== '') {
				P7_AP4setClass(tB, 'ap4-legacy');
			}
			tB.ap4ToolbarClosed = false;
			tBR = document.getElementById(tB.id.replace('_', 'tb_'));
			tBW = document.getElementById(tB.id.replace('_', 'rw_'));
			if (tBR && tBW) {
				tBR.ap4root = tB.id;
				tBR.ap4wrapper = tBW;
				cl = tBR.className;
				if (cl && cl !== '' && cl.indexOf('opened') > -1) {
					tBR.ap4State = 'open';
					tBW.ap4State = 'open';
					P7_AP4setClass(tBW, 'opened');
				} else {
					tB.ap4ToolbarClosed = true;
					tBW.ap4State = 'closed';
					tBR.ap4State = 'closed';
				}
				tBR.onclick = function(){
					var tBW = this.ap4wrapper;
					if (tBW.ap4State == 'open') {
						this.ap4State = 'closed';
						tBW.ap4State = 'closed';
						P7_AP4changeClass(this, 'opened', 'closed');
						P7_AP4changeClass(tBW, 'opened', 'closed');
					} else {
						this.ap4State = 'open';
						tBW.ap4State = 'open';
						P7_AP4changeClass(this, 'closed', 'opened');
						P7_AP4changeClass(tBW, 'closed', 'opened');
					}
				};
				tA = tBR.getElementsByTagName('A');
				if (tA && tA[0]) {
					tA[0].onclick = function(){
						return false;
					};
				}
			}
			tA = tB.getElementsByTagName('A');
			for (j = 0; j < tA.length; j++) {
				if (tA[j].id && tA[j].id.indexOf(tB.id.replace('_', 't') + '_') === 0) {
					tB.ap4Trigs[tB.ap4Trigs.length] = tA[j];
					tA[j].ap4State = 'closed';
					tA[j].ap4Div = tB.id;
					tA[j].ap4Cnt = false;
					tC = document.getElementById(tA[j].id.replace('t', 'w'));
					tB.ap4Cont[tB.ap4Cont.length] = (tC) ? tC : null;
					if (tC) {
						tC.ap4State = 'closed';
						tC.ap4Trg = tA[j].id;
						tA[j].ap4Cnt = tC.id;
						tC.ap4CurrentHeight = 0;
						tC.ap4FinishHeight = 0;
						tC.ap4StartHeight = 0;
						tC.style.height = '0px';
					} else {
						P7_AP4setClass(tA[j], 'p7AP4_ext');
					}
					P7_AP4addEvent(tA[j], 'click', function(evt){
						evt = (evt) ? evt : event;
						if (!P7_AP4trig(this)) {
							if (evt.preventDefault) {
								evt.preventDefault();
							} else {
								evt.returnValue = false;
							}
						}
					});
					if (tB.p7opt[6] == 1) {
						tA[j].onmouseover = function(){
							if (this.ap4State == 'closed') {
								P7_AP4open(this);
							}
						};
					}
					if (tB.p7opt[7] == 1) {
						tA[j].onmouseout = function(evt){
							var tg, pp, dv, tB, m = true;
							tB = document.getElementById(this.ap4Div);
							dv = this.id.replace('t', 'w');
							evt = (evt) ? evt : event;
							tg = (evt.toElement) ? evt.toElement : evt.relatedTarget;
							if (tg) {
								pp = tg;
								while (pp) {
									if (pp.id && pp.id.indexOf('p7AP4') === 0) {
										m = false;
										break;
									}
									pp = pp.parentNode;
								}
							}
							if (m) {
								P7_AP4close(this);
							}
						};
						if (tC) {
							tC.onmouseout = function(evt){
								var tg, pp, tA, tB, m = true;
								evt = (evt) ? evt : event;
								tg = (evt.toElement) ? evt.toElement : evt.relatedTarget;
								tA = document.getElementById(this.ap4Trg);
								tB = document.getElementById(this.ap4Div);
								if (tg) {
									pp = tg;
									if (tg.id && tg.id == tA.ap4Div) {
										m = true;
									} else {
										while (pp) {
											if (pp.id) {
												if (pp.id.indexOf(tA.ap4Div) === 0) {
													m = false;
													break;
												}
											}
											pp = pp.parentNode;
										}
									}
									if (m) {
										if (tA) {
											if (tA.ap4State == 'open') {
												P7_AP4close(tA);
											}
										}
									}
								}
							};
						}
					}
					tA[j].hasImg = false;
					iM = tA[j].getElementsByTagName("IMG");
					if (iM && iM[0]) {
						sr = iM[0].getAttribute("src");
						swp = tB.p7opt[8];
						iM[0].ap4swap = swp;
						x = sr.lastIndexOf(".");
						fnA = sr.substring(0, x);
						fnB = '.' + sr.substring(x + 1);
						s1 = fnA + p7AP4.imOver + fnB;
						s2 = fnA + p7AP4.imOpen + fnB;
						if (swp == 1) {
							iM[0].p7imgswap = [sr, s1, s1, s1];
							P7_AP4preloader(s1);
						} else if (swp == 2) {
							iM[0].p7imgswap = [sr, s1, s2, s2];
							P7_AP4preloader(s1, s2);
						} else {
							iM[0].p7imgswap = [sr, sr, sr, sr];
						}
						iM[0].ap4State = 'closed';
						iM[0].mark = false;
						iM[0].rollover = tB.p7opt[9];
						if (swp > 0) {
							tA[j].hasImg = true;
							iM[0].onmouseover = function(){
								P7_AP4imovr(this);
							};
							iM[0].onmouseout = function(){
								P7_AP4imout(this);
							};
							tA[j].onfocus = function(){
								P7_AP4imovr(this.getElementsByTagName('IMG')[0]);
							};
							tA[j].onblur = function(){
								P7_AP4imout(this.getElementsByTagName('IMG')[0]);
							};
						}
					}
				}
			}
			el = tB.ap4Trigs[0];
			P7_AP4setClass(el, 'ap4first');
			P7_AP4setClass(el.parentNode, 'ap4first');
			P7_AP4setClass(el.parentNode.parentNode, 'ap4first');
			if (tB.ap4Cont[0]) {
				P7_AP4setClass(tB.ap4Cont[0], 'ap4first');
			}
			k = tB.ap4Trigs.length - 1;
			el = tB.ap4Trigs[k];
			P7_AP4setClass(el, 'ap4last');
			P7_AP4setClass(el.parentNode, 'ap4last');
			P7_AP4setClass(el.parentNode.parentNode, 'ap4last');
			if (tB.ap4Cont[k]) {
				P7_AP4setClass(tB.ap4Cont[k], 'ap4last');
			}
			if (tB.p7opt[3] == -2) {
				P7_AP4all(tB.id, 'open');
			} else if (tB.p7opt[3] == -3) {
				P7_AP4all(tB.id, 'open');
				setTimeout("P7_AP4all('" + tB.id + "','close',1)", 200);
			} else if (tB.p7opt[3] == -1) {
				ob = P7_AP4random(tB.id);
				P7_AP4open(ob, 1, 1, 1);
			} else {
				tr = tB.id.replace("_", "t") + "_" + tB.p7opt[3];
				ob = document.getElementById(tr);
				if (ob) {
					P7_AP4open(ob, 1, 1, 1);
				}
			}
		}
	}
	for (i = 0; i < p7AP4.ctl.length; i++) {
		tB = document.getElementById(p7AP4.ctl[i][0]);
		if (tB.p7opt[5] == 1 && tB.p7opt[3] != -2) {
			if (tB.p7opt[3] == -3) {
				setTimeout("P7_AP4auto('" + tB.id + "')", 200);
			} else {
				P7_AP4auto(tB);
			}
		}
		if (tB.p7opt[10] > 0) {
			tB.p7rtmr = setTimeout("P7_AP4rotate('" + tB.id + "'," + tB.p7opt[10] + ")", tB.p7opt[11]);
		}
		P7_AP4url(p7AP4.ctl[i][0]);
	}
	p7AP4.init = true;
}

function P7_AP4preloader(){
	var i, x;
	for (i = 0; i < arguments.length; i++) {
		x = document.p7AP4preload.length;
		document.p7AP4preload[x] = new Image();
		document.p7AP4preload[x].src = arguments[i];
	}
}

function P7_AP4imovr(im){
	var m = false, r = im.rollover;
	if (im.mark) {
		m = (r > 1) ? true : false;
	} else if (im.ap4State == 'open') {
		m = (r == 1 || r == 3) ? true : false;
	} else {
		m = true;
	}
	if (m) {
		im.src = im.p7imgswap[1];
	}
}

function P7_AP4imout(im){
	var r = im.rollover;
	if (im.mark) {
		if (im.ap4State == 'open') {
			im.src = im.p7imgswap[2];
		} else {
			im.src = im.p7imgswap[3];
		}
	} else if (im.ap4State == 'open') {
		if (r == 1 || r == 3) {
			im.src = im.p7imgswap[2];
		}
	} else {
		im.src = im.p7imgswap[0];
	}
}

function P7_AP4control(tr, ac){
	P7_AP4ctl(tr, ac);
}

function P7_AP4controlAll(dv, ac){
	P7_AP4all(dv, ac);
}

function P7_AP4ctl(tr, ac, bp, tg, an, rt){
	var tA = document.getElementById(tr);
	if (tA) {
		if (ac == 'open') {
			if (tA.ap4State != 'open') {
				P7_AP4open(tA, bp, tg, an, rt);
			}
		} else if (ac == 'close') {
			if (tA.ap4State != 'closed') {
				P7_AP4close(tA, bp, tg, an, rt);
			}
		} else if (ac == 'trigger') {
			P7_AP4trig(tA, bp, tg, an, rt);
		}
	}
	return false;
}

function P7_AP4all(dv, ac, rt){
	var i, j, tB, a, tA, an = 1;
	if (rt == 1) {
		an = null;
	}
	if (dv == 'all') {
		for (i = 0; i < p7AP4.ctl.length; i++) {
			tB = document.getElementById(p7AP4.ctl[i][0]);
			tA = tB.ap4Trigs;
			for (j = 0; j < tA.length; j++) {
				if (ac == 'open' && tA[j].ap4State != 'open') {
					P7_AP4open(tA[j], 1, 1, an);
				} else if (ac == 'close' && tA[j].ap4State != 'closed') {
					P7_AP4close(tA[j], 1, 1, an);
				}
			}
		}
	} else {
		tB = document.getElementById(dv);
		if (tB) {
			tA = tB.ap4Trigs;
			for (j = 0; j < tA.length; j++) {
				if (ac == 'open' && tA[j].ap4State != 'open') {
					P7_AP4open(tA[j], 1, 1, an);
				} else if (ac == 'close' && tA[j].ap4State != 'closed') {
					P7_AP4close(tA[j], 1, 1, an);
				}
			}
		}
	}
}

function P7_AP4random(dd){
	var i, k, j = 0, tB, tA, a, rD = [];
	tB = document.getElementById(dd);
	if (tB) {
		tA = tB.getElementsByTagName("A");
		for (i = 0; i < tA.length; i++) {
			if (tA[i].ap4Div && tA[i].ap4Div == dd && tA[i].ap4Cnt) {
				rD[j] = tA[i].id;
				j++;
			}
		}
		if (j > 0) {
			k = Math.floor(Math.random() * j);
			a = document.getElementById(rD[k]);
		}
	}
	return a;
}

function P7_AP4rotator(dv, md, pn){
	P7_AP4rotate(dv, md, pn);
}

function P7_AP4rotate(dv, md, pn){
	var i, pl, tB = document.getElementById(dv);
	if (md === 0) {
		if (tB.p7rtmr) {
			clearTimeout(tB.p7rtmr);
		}
		if (tB.p7rtrun) {
			tB.p7rtcntr--;
			tB.p7rtrun = false;
		}
		return;
	} else {
		if (tB.p7rtrun) {
			return;
		}
	}
	if (tB && tB.ap4Trigs) {
		if (md > 0) {
			tB.p7rtmd = md;
			tB.p7rtcy = 1;
			tB.p7rtcntr = 1;
		}
		if (!pn || pn < 0) {
			pn = -1;
			for (i = 0; i < tB.ap4Trigs.length; i++) {
				if (tB.ap4Trigs[i].ap4State == 'open') {
					pn = i;
					break;
				}
			}
		} else {
			pn--;
		}
		pl = pn;
		pn = (pn <= -1) ? 0 : pn;
		pn = (pn > tB.ap4Trigs.length - 1) ? tB.ap4Trigs.length - 1 : pn;
		if (md > 0) {
			tB.p7rtsp = (pl == -1) ? pl : pn;
		}
		if (tB.p7rtmr) {
			clearTimeout(tB.p7rtmr);
		}
		tB.p7rtmr = setTimeout("P7_AP4runrt('" + dv + "'," + pn + ")", 10);
	}
}

function P7_AP4runrt(dv, n){
	var a, tB;
	tB = document.getElementById(dv);
	tB.p7rtrun = true;
	if (tB.p7rtmr) {
		clearTimeout(tB.p7rtmr);
	}
	if (n > -1 && n < tB.ap4Trigs.length) {
		a = tB.ap4Trigs[n];
		if (a.ap4State != "open") {
			P7_AP4open(a, null, null, null, 1);
		}
		tB.p7rtcntr++;
	}
	n++;
	if (tB.p7rtcntr > tB.ap4Trigs.length) {
		tB.p7rtcy++;
		tB.p7rtcntr = 1;
	}
	if (n >= tB.ap4Trigs.length) {
		n = 0;
	}
	if (tB.p7rtcy > tB.p7rtmd) {
		if (tB.p7rtsp == -1) {
			tB.p7rtmr = setTimeout("P7_AP4all('" + dv + "','close',1)", tB.p7opt[11]);
		} else {
			tB.p7rtmr = setTimeout("P7_AP4ctl('" + tB.ap4Trigs[n].id + "','open',true,false,false,1)", tB.p7opt[11]);
		}
		tB.p7rtrun = false;
	} else {
		tB.p7rtmr = setTimeout("P7_AP4runrt('" + dv + "'," + n + ")", tB.p7opt[11]);
	}
}

function P7_AP4trig(a, bp, tg, an, rt){
	var h, wH, m = false;
	if (!p7AP4.init && !bp) {
		return false;
	}
	h = a.getAttribute("href");
	wH = window.location.href;
	if (h && h !== '') {
		if (a.href != wH && a.href != wH + '#' && a.href.indexOf('#p7AP4') == -1) {
			if (h.search(/javas/i) !== 0) {
				if (!a.ap4Cnt || a.ap4State == 'open') {
					m = true;
				}
			}
		}
	}
	if (!m) {
		if (a.ap4State == 'open') {
			P7_AP4close(a, bp, tg, an, rt);
		} else {
			P7_AP4open(a, bp, tg, an, rt);
		}
	}
	return m;
}

function P7_AP4open(a, bp, tg, an, rt){
	var i, j, tB, cT, iM, op, tC;
	if (!p7AP4.init && !bp) {
		return;
	}
	if (a.ap4State == 'open') {
		return;
	}
	tB = document.getElementById(a.ap4Div);
	op = tB.p7opt[2];
	if (!rt) {
		if (tB.p7rtmr) {
			clearTimeout(tB.p7rtmr);
		}
		tB.p7rtrun = false;
	}
	if (!p7AP4.init || an == 1) {
		op = 0;
	}
	a.ap4State = 'open';
	P7_AP4setClass(a, 'ap4Trigs_down');
	if (a.hasImg) {
		iM = a.getElementsByTagName("IMG")[0];
		iM.ap4State = 'open';
		iM.src = iM.p7imgswap[2];
	}
	cT = document.getElementById(a.ap4Cnt);
	if (!cT) {
		return;
	}
	tC = document.getElementById(a.id.replace('t', 'c'));
	if ((!tg && tB.p7opt[1] == 1) || rt == 1) {
		for (i = 0; i < tB.ap4Trigs.length; i++) {
			if (tB.ap4Trigs[i].ap4State == 'open') {
				if (tB.ap4Trigs[i] != a) {
					P7_AP4close(tB.ap4Trigs[i], 1, 1);
				}
			}
		}
	}
	if (cT) {
		if (tB.p7opt[2] > 0) {
			cT.ap4StartHeight = cT.offsetHeight;
			cT.ap4FinishHeight = tC.offsetHeight;
			cT.ap4CurrentHeight = cT.ap4StartHeight;
			cT.style.height = cT.ap4StartHeight + 'px';
			for (j = 0; j < tB.ap4Trigs.length; j++) {
				if (tB.ap4Cont[j]) {
					tB.ap4Cont[j].ap4StartHeight = tB.ap4Cont[j].offsetHeight;
				}
			}
			tB.ap4StartTime = P7_AP4getTime(0);
			cT.ap4StartTime = P7_AP4getTime(0);
			if (op > 0) {
				if (!tB.p7AP4running) {
					tB.p7AP4running = true;
					tB.p7AP4glide = setInterval("P7_AP4glide('" + tB.id + "','" + tB.ap4AnimType + "')", p7AP4.frameRate);
				}
			} else {
				cT.ap4CurrentHeight = cT.ap4FinishHeight;
				cT.style.height = 'auto';
			}
		} else {
			cT.style.height = 'auto';
		}
		if (tB.p7opt[15] == 1) {
			if (tB.p7opt[16] === 0 || p7AP4.init) {
				if (tB.ap4STEanim) {
					clearTimeout(tB.ap4STEanim);
				}
				tB.ap4STEanim = setTimeout(function(){
					P7_AP4ste(a, tB);
				}, tB.p7opt[12] + 100);
			}
		}
	}
}

function P7_AP4close(a, bp, tg, an, rt){
	var i, j, m = false, tB, cT, iM, op;
	if (!p7AP4.init && !bp) {
		return;
	}
	if (a.ap4State == 'closed') {
		return;
	}
	tB = document.getElementById(a.ap4Div);
	op = tB.p7opt[2];
	if (!rt) {
		if (tB.p7rtmr) {
			clearTimeout(tB.p7rtmr);
		}
		tB.p7rtrun = false;
	}
	if (!p7AP4.init || an == 1) {
		op = 0;
	}
	if (!tg && tB.p7opt[4] == 1) {
		for (i = 0; i < tB.ap4Trigs.length; i++) {
			if (tB.ap4Trigs[i].ap4State == 'open') {
				if (tB.ap4Trigs[i] != a) {
					m = true;
					break;
				}
			}
		}
		if (!m) {
			return;
		}
	}
	a.ap4State = 'closed';
	P7_AP4remClass(a, 'ap4Trigs_down');
	if (a.hasImg) {
		iM = a.getElementsByTagName("IMG")[0];
		iM.ap4State = 'closed';
		if (iM.mark) {
			iM.src = iM.p7imgswap[3];
		} else {
			iM.src = iM.p7imgswap[0];
		}
	}
	cT = document.getElementById(a.ap4Cnt);
	if (cT) {
		if (tB.p7opt[2] > 0) {
			cT.ap4StartHeight = cT.offsetHeight;
			cT.ap4FinishHeight = 0;
			cT.ap4CurrentHeight = cT.ap4StartHeight;
			cT.style.height = cT.ap4StartHeight + 'px';
			for (j = 0; j < tB.ap4Trigs.length; j++) {
				if (tB.ap4Cont[j]) {
					tB.ap4Cont[j].ap4StartHeight = tB.ap4Cont[j].offsetHeight;
				}
			}
			tB.ap4StartTime = P7_AP4getTime(0);
			cT.ap4StartTime = P7_AP4getTime(0);
			if (op > 0) {
				if (!tB.p7AP4running) {
					tB.p7AP4running = true;
					tB.p7AP4glide = setInterval("P7_AP4glide('" + tB.id + "','" + tB.ap4AnimType + "')", p7AP4.frameRate);
				}
			} else {
				cT.ap4CurrentHeight = 0;
				cT.style.height = '0px';
			}
		} else {
			cT.style.height = '0px';
		}
	}
}

function P7_AP4glide(d, tp){
	var i, tD, tC, tA, nh, et, cet, m = false;
	tD = document.getElementById(d);
	tC = tD.ap4Cont;
	tA = tD.ap4Trigs;
	et = P7_AP4getTime(tD.ap4StartTime);
	if (et >= tD.ap4Duration) {
		et = tD.ap4Duration;
	}
	for (i = 0; i < tA.length; i++) {
		if (tC[i]) {
			if (tC[i].ap4CurrentHeight != tC[i].ap4FinishHeight) {
				nh = P7_AP4anim(tp, et, tC[i].ap4StartHeight, tC[i].ap4FinishHeight - tC[i].ap4StartHeight, tD.ap4Duration);
				tC[i].ap4CurrentHeight = nh;
				tC[i].style.height = nh + 'px';
				m = true;
			} else if (tA[i].ap4State == 'open') {
				if (tC[i].ap4CurrentHeight == tC[i].ap4FinishHeight) {
					tC[i].style.height = 'auto';
				}
			}
		}
	}
	if (!m) {
		tD.p7AP4running = false;
		clearInterval(tD.p7AP4glide);
	}
}

function P7_AP4getTime(st){
	var d = new Date();
	return d.getTime() - st;
}

function P7_AP4ste(el, dv){
	var st, t, tB, bD, sb, se;
	bD = document.body;
	bD.p7AnimRunning = false;
	sb = document.body.scrollTop;
	se = document.documentElement.scrollTop;
	if (sb.p7STEanim) {
		sb.p7AnimRunning = false;
		clearInterval(sb.p7STEanim);
	}
	if (se.p7STEanim) {
		se.p7AnimRunning = false;
		clearInterval(se.p7STEanim);
	}
	st = sb;
	if (se > sb) {
		st = se;
	}
	t = st + el.getBoundingClientRect().top;
	t -= dv.p7opt[17];
	if (dv.p7opt[2] > 0) {
		bD.p7animType = 'quad';
		bD.p7animStartVal = st;
		bD.p7animCurrentVal = bD.p7animStartVal;
		bD.p7animFinishVal = t;
		bD.p7animStartTime = P7_AP4getTime(0);
		bD.p7animDuration = p7AP4.defDuration;
		if (!bD.p7AnimRunning) {
			bD.p7AnimRunning = true;
			bD.p7STEanim = setInterval(function(){
				P7_AP4steA(bD);
			}, p7AP4.frameRate);
		}
	} else {
		bD.body.scrollTop = t;
		document.documentElement.scrollTop = t;
		if (typeof(P7_STTrsz) == 'function') {
			P7_STTrsz();
		}
	}
	return false;
}

function P7_AP4steA(el){
	var et, nv, m = false;
	et = P7_AP4getTime(el.p7animStartTime);
	if (et >= el.p7animDuration) {
		et = el.p7animDuration;
		m = true;
	}
	if (el.p7animCurrentVal != el.p7animFinishVal) {
		nv = P7_AP4anim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal - el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal = nv;
		el.scrollTop = nv;
		document.documentElement.scrollTop = nv;
	}
	if (m) {
		el.p7AnimRunning = false;
		clearInterval(el.p7STEanim);
		if (typeof(P7_STTrsz) == 'function') {
			P7_STTrsz();
		}
	}
}

function P7_AP4url(dv){
	var i, h, s, x, d = 'ap4', a, n = dv.replace("p7AP4_", "");
	if (document.getElementById) {
		h = document.location.search;
		if (h) {
			h = h.replace('?', '');
			s = h.split(/[=&]/g);
			if (s && s.length) {
				for (i = 0; i < s.length; i += 2) {
					if (s[i] == d) {
						x = s[i + 1];
						if (n != x.match(/\d*[^_]/)) {
							x = false;
						}
						if (x) {
							a = document.getElementById('p7AP4t' + x);
							if (a && a.ap4State != "open") {
								P7_AP4open(a, 1);
							}
						}
					}
				}
			}
		}
		h = document.location.hash;
		if (h) {
			x = h.substring(1, h.length);
			if (n != x.replace(d, '').match(/\d*[^_]/)) {
				x = false;
			}
			if (x && x.indexOf(d) === 0) {
				a = document.getElementById('p7AP4t' + x.substring(3));
				if (a && a.ap4State != "open") {
					P7_AP4open(a, 1);
				}
			}
		}
	}
}

function P7_AP4auto(ob){
	var i, wH, tr, pp, im, r1, tA, pA;
	if (typeof ob != 'object') {
		ob = document.getElementById(ob);
	}
	wH = window.location.href;
	if (ob.p7opt[14] != 1) {
		wH = wH.replace(window.location.search, '');
	}
	if (wH.charAt(wH.length - 1) == '#') {
		wH = wH.substring(0, wH.length - 1);
	}
	r1 = /index\.[\S]*/i;
	tA = ob.getElementsByTagName("A");
	for (i = 0; i < tA.length; i++) {
		if (tA[i].href == wH) {
			if (tA[i].ap4Div) {
				tr = tA[i];
				break;
			} else {
				P7_AP4setClass(tA[i], 'current_mark');
				pp = tA[i].parentNode;
				while (pp) {
					if (pp.id && pp.id.indexOf('p7AP4w') === 0) {
						tr = document.getElementById(pp.ap4Trg);
						break;
					}
					pp = pp.parentNode;
				}
				break;
			}
		}
	}
	if (tr) {
		P7_AP4setClass(tr, 'current_mark');
		P7_AP4setClass(tr.parentNode, 'current_mark');
		if (tr.hasImg) {
			im = tr.getElementsByTagName('IMG')[0];
			im.mark = true;
			im.src = im.p7imgswap[3];
		}
		if (ob.p7opt[13] == 1) {
			P7_AP4open(tr, 1);
		}
		pp = tr.parentNode;
		while (pp) {
			if (pp.id && pp.id.indexOf('p7AP4w') === 0) {
				pA = document.getElementById(pp.id.replace('w', 't'));
				if (pA) {
					P7_AP4setClass(pA, 'current_mark');
					P7_AP4setClass(pA.parentNode, 'current_mark');
					if (pA.hasImg) {
						im = pA.getElementsByTagName('IMG')[0];
						im.mark = true;
						im.src = im.p7imgswap[3];
					}
					if (ob.p7opt[13] == 1) {
						P7_AP4open(pA, 1);
					}
				}
			}
			if (pp.nodeName && pp.nodeName == 'BODY') {
				break;
			}
			pp = pp.parentNode;
		}
	}
}

function P7_AP4changeClass(ob, clf, clt){
	P7_AP4remClass(ob, clf);
	P7_AP4setClass(ob, clt);
}

function P7_AP4setClass(ob, cl){
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

function P7_AP4remClass(ob, cl){
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

function P7_AP4anim(tp, t, b, c, d){
	if (tp == 'linear') {
		return (c * (t / d)) + b;
	} else if (tp == 'quad') {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		} else {
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	} else if (tp == 'inquad') {
		var tt = t / d;
		return c * (tt) * (tt) + b;
	} else if (tp == 'bounce') {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
		}
	}
}

function P7_AP4addEvent(obj, evt, fn){
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}

function P7_AP4getCSSPre(){
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

function P7_AP4supports(st){
	return document.createElement('div').style[st];
}
