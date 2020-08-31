
/* 
 ================================================
 PVII Background Animator Magic scripts
 Copyright (c) 2018 Project Seven Development
 www.projectseven.com
 Version: 1.0.8 -build 15
 ================================================
 
 */
var p7BAMtext = {
	playShow: 'Play Slide Show',
	pauseShow: 'Pause Slide Show'
};
var p7BAM = {
	ctl: [],
	once: false,
	legacy: false,
	ie: false,
	prf: 'none'
};
function P7_BAMbb(){
}

function P7_BAMaddLoad(){
	if (window.addEventListener) {
		document.addEventListener("DOMContentLoaded", P7_BAMinit, false);
		window.addEventListener("load", P7_BAMinit, false);
		window.addEventListener("unload", P7_BAMbb, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", P7_BAMinit);
		window.attachEvent("onunload", P7_BAMbb);
	}
}

P7_BAMaddLoad();
function P7_BAMinit(){
	var cT, j, op, tB, sy, el, cl, tlc, tA, k, i, pli = 0;
	if (p7BAM.once) {
		return;
	}
	p7BAM.once = true;
	p7BAM.prf = P7_BAMgetCSSPre();
	document.p7bampre = [];
	cT = P7_BAMgetByAttribute('data-bam-body', 'bam-list');
	if (cT && cT[0]) {
		el = document.body;
		el.setAttribute('data-bam', cT[0].getAttribute('data-bam'));
		P7_BAMsetClass(el, 'bam-bg');
		cT[0].removeAttribute('data-bam');
	}
	cT = P7_BAMgetByAttribute('data-bam', 'bam-bg');
	for (j = 0; j < cT.length; j++) {
		op = cT[j].getAttribute('data-bam').split(',');
		tB = document.getElementById('p7BAM_' + op[0]);
		tB.bamOpt = op;
		sy = P7_BAMgetStyle(cT[j], 'position');
		if (!sy || sy === '' || sy == 'static') {
			cT[j].style.position = 'relative';
		}
		P7_BAMremClass(tB, 'bam-noscript');
		p7BAM.ctl[p7BAM.ctl.length] = tB;
		if (tB.bamOpt[2] > 0 && p7BAM.prf == 'none') {
			tB.bamOpt[2] = 0;
		}
		el = document.getElementById(tB.id.replace('_', 'list_'));
		if (tB.bamOpt[1] < 1) {
			P7_BAMrandomizer(el);
			tB.bamOpt[1] = 1;
		}
		el = document.createElement('span');
		cl = 'p7BAM bam-wrapper';
		if (cT[j].tagName == 'BODY') {
			cl += ' bam-body';
		}
		el.setAttribute('class', cl);
		cT[j].appendChild(el);
		tB.bamWrapper = el;
		el = document.createElement('span');
		el.setAttribute('class', 'bam-mask');
		tB.bamWrapper.appendChild(el);
		cl = tB.getAttribute('class');
		if (/bam\-rounded/.test(cl)) {
			P7_BAMsetClass(tB.bamWrapper, 'bam-rounded');
		}
		tlc = cl.match(/bam\-color\-[^\s]*\b/);
		if (tlc && tlc[0]) {
			P7_BAMsetClass(el, tlc[0]);
		}
		if (tB.bamOpt[10] > 0) {
			el.style.opacity = parseInt(tB.bamOpt[10], 10) / 100;
		}
		el = document.getElementById(tB.id.replace('_', 'tb_'));
		if (el) {
			cT[j].appendChild(el);
		}
		tB.bamDefImage = tB.bamOpt[1];
		tB.bamCurrSlideNum = 0;
		tB.bamPrevSlideNum = 0;
		tB.bamNumPlays = 1;
		tB.bamDirection = 'right';
		tB.bamShowMode = 'pause';
		tB.bamList = [];
		tB.bamSlides = [];
		tB.bamControls = [];
		tB.bamKBnum = 0;
		tB.bamMLnum = 0;
		el = document.getElementById(tB.id.replace('_', 'list_'));
		tA = el.getElementsByTagName('A');
		k = 0;
		for (i = 0; i < tA.length; i++) {
			cl = tA[i].className;
			if (tA[i].parentNode.nodeName == "LI" && cl && (/bam/.test(cl))) {
				k++;
				tB.bamList[k] = tA[i];
				tA[i].bamDiv = tB.id;
				tA[i].bamSlideNum = k;
				document.p7bampre[pli] = new Image();
				document.p7bampre[pli].cmp = false;
				document.p7bampre[pli].bamDiv = tB.id;
				P7_BAMsetImage(document.p7bampre[pli]);
				tA[i].bamPreIndex = pli;
				tA[i].bamPreImage = document.p7bampre[pli];
				if (k < 2) {
					document.p7bampre[pli].src = tA[i].href;
				}
				pli++;
				el = document.createElement('span');
				el.className = 'bam-image ' + tA[i].className;
				tB.bamWrapper.appendChild(el);
				tB.bamSlides[k] = el;
				tB.bamSlideNums = tB.bamSlides.length - 1;
			}
		}
		tB.bamControls[3] = P7_BAMsetCC(tB.id, 'rp_', 'prev');
		tB.bamControls[5] = P7_BAMsetCC(tB.id, 'rn_', 'next');
		el = document.getElementById(tB.id.replace('_', 'rpp_'));
		if (el) {
			el.p7state = 'pause';
			el.bamDiv = tB.id;
			el.setAttribute('title', p7BAMtext.playShow);
			tB.bamControls[4] = el;
			el.onclick = function(){
				var ac = (this.p7state == 'play') ? 'pause' : 'play';
				P7_BAMcontrol(this.bamDiv, ac, 3);
				return false;
			};
			el.bamSetButtonState = function(st){
				var tx;
				if (st == 'play') {
					tx = p7BAMtext.pauseShow;
					P7_BAMremClass(this, 'paused');
				} else {
					tx = p7BAMtext.playShow;
					P7_BAMsetClass(this, 'paused');
				}
				this.setAttribute('title', tx);
			};
		}
		if (tB.bamOpt[4] == 1) {
			tB.bamShowMode = 'play';
			tB.bamShowResume = false;
			if (tB.bamControls[4]) {
				tB.bamControls[4].p7state = 'play';
				tB.bamControls[4].bamSetButtonState('play');
			}
		}
		P7_BAMurl(tB.id);
		P7_BAMshowSlide(tB.id, tB.bamDefImage, 1);
	}
}

function P7_BAMctrl(dv, ac){
	return P7_BAMcontrol(dv, ac);
}

function P7_BAMcontrol(dv, ac, bp){
	var tD, cs, ts, m = false, rs = false, sn, pauseOnAction;
	tD = document.getElementById(dv);
	if (tD) {
		if (tD.bamShowTimer) {
			clearTimeout(tD.bamShowTimer);
		}
		pauseOnAction = (tD.bamOpt[8] == 1) ? true : false;
		cs = parseInt(tD.bamCurrSlideNum, 10);
		ts = parseInt(tD.bamSlideNums, 10);
		if (ac == 'pause') {
			if (bp !== 3) {
				if (tD.bamOpt[9] == 1 && tD.bamShowMode == 'play') {
					tD.bamShowResume = true;
				} else {
					tD.bamShowResume = false;
				}
			}
			P7_BAMpause(dv);
			return m;
		}
		if (!bp && pauseOnAction) {
			if (tD.bamOpt[9] == 1 && tD.bamShowMode == 'play') {
				tD.bamShowResume = true;
			}
			P7_BAMpause(dv, ac);
		}
		if (ac == 'play') {
			tD.bamShowMode = 'play';
			tD.bamShowResume = false;
			if (tD.bamControls[4]) {
				tD.bamControls[4].p7state = 'play';
				tD.bamControls[4].bamSetButtonState('play');
			}
			ac = 'next';
			rs = true;
		}
		if (ac == 'first') {
			tD.bamDirection = 'left';
			sn = 1;
		} else if (ac == 'prev') {
			tD.bamDirection = 'left';
			sn = cs - 1;
			if (sn < 1) {
				sn = ts;
			}
		} else if (ac == 'next') {
			sn = cs + 1;
			tD.bamDirection = 'right';
			if (tD.bamShowMode == 'play') {
				if (sn > ts) {
					tD.bamNumPlays++;
					if (tD.bamOpt[6] > 0 && tD.bamNumPlays > tD.bamOpt[6]) {
						tD.bamNumPlays = 0;
						sn = (tD.bamOpt[7] == 1) ? 1 : tD.bamSlideNums;
						P7_BAMpause(tD.id);
					} else {
						sn = 1;
					}
				}
			} else {
				if (sn > ts) {
					sn = 1;
				}
			}
		} else if (ac == 'last') {
			tD.bamDirection = 'right';
			sn = ts;
		} else {
			tD.bamDirection = 'right';
			sn = ac;
			tD.bamDirection = 'left';
		}
		sn = (sn < 1) ? 1 : sn;
		sn = (sn > tD.bamSlideNums) ? tD.bamSlideNums : sn;
		if (sn == tD.bamCurrSlideNum && bp != 1) {
			return m;
		}
		P7_BAMshowSlide(tD.id, sn, bp);
	}
	return false;
}

function P7_BAMpause(d, ac){
	var sd, sB, tD = document.getElementById(d);
	if (tD) {
		tD.bamShowMode = 'pause';
		if (tD.bamShowTimer) {
			clearTimeout(tD.bamShowTimer);
		}
		if (tD.bamControls[4]) {
			tD.bamControls[4].p7state = 'pause';
			tD.bamControls[4].bamSetButtonState('pause');
		}
		if (tD.bamOpt[2] == 4) {
			if (ac != 'prev' && ac != 'next') {
				sB = tD.bamCurrSlide;
				if (window.getComputedStyle) {
					sd = window.getComputedStyle(sB);
					sB.style[p7BAM.prf + 'transform'] = sd.getPropertyValue(p7BAM.prf + 'transform');
				}
			}
		}
	}
}

function P7_BAMshowSlide(dv, sn, bp){
	var i, tD, tA, sB, an, dur, x, cl;
	bp = (bp) ? bp : null;
	tD = document.getElementById(dv);
	if (!tD.bamSlides[sn]) {
		return false;
	}
	if (tD.bamCurrSlideNum == sn && bp != 1) {
		return false;
	}
	if (tD.bamShowTimer) {
		clearTimeout(tD.bamShowTimer);
	}
	if (tD.bamCurrSlideNum !== 0) {
		tD.bamPrevSlideNum = tD.bamCurrSlideNum;
	}
	tD.bamCurrSlideNum = sn;
	tA = tD.bamList[sn];
	sB = tD.bamSlides[sn];
	sB.style.backgroundImage = 'url("' + tD.bamList[sn].getAttribute('href') + '")';
	if (sB.bamAnimC) {
		clearTimeout(sB.bamAnimC);
	}
	tD.bamPrevSlide = tD.bamCurrSlide;
	tD.bamCurrSlide = sB;
	an = (bp && bp == 1) ? 0 : tD.bamOpt[2];
	if (tD.bamOpt[2] > 3) {
		an = tD.bamOpt[2];
	}
	dur = tD.bamOpt[3];
	P7_BAMsetClass(sB, 'current-slide');
	sB.style.zIndex = 1;
	if (tD.bamPrevSlide && tD.bamPrevSlideNum != sn) {
		tD.bamPrevSlide.style.zIndex = 0;
	}
	if (an == 1) {
		sB.style[p7BAM.prf + 'transition'] = null;
		sB.style.left = '0px';
		sB.style.opacity = 0;
		sB.offsetWidth = sB.offsetWidth;
		sB.style.visibility = 'visible';
		sB.style[p7BAM.prf + 'transition'] = 'opacity ' + dur + 'ms linear';
		sB.style.opacity = 1;
		P7_BAMdispFin(dv, sn, bp);
	} else if (an == 2) {
		sB.style.visibility = 'hidden';
		x = sB.offsetWidth;
		if (tD.bamDirection == 'left') {
			x = x * -1;
		}
		sB.style[p7BAM.prf + 'transition'] = null;
		sB.style.left = x + 'px';
		sB.offsetWidth = sB.offsetWidth;
		sB.style.visibility = 'visible';
		sB.style[p7BAM.prf + 'transition'] = 'left ' + dur + 'ms ease-out';
		sB.style.left = '0px';
		P7_BAMdispFin(dv, sn, bp);
	} else if (an == 3) {
		sB.style.visibility = 'hidden';
		x = sB.offsetWidth;
		if (tD.bamDirection == 'left') {
			x = x * -1;
		}
		x = x * 0.60;
		sB.style[p7BAM.prf + 'transition'] = null;
		sB.style.opacity = 0;
		sB.style.left = x + 'px';
		sB.offsetWidth = sB.offsetWidth;
		sB.style.visibility = 'visible';
		sB.style[p7BAM.prf + 'transition'] = 'left ' + dur + 'ms ease, opacity ' + (dur * 2) + 'ms ease-out';
		sB.style.left = '0px';
		sB.style.opacity = 1;
		P7_BAMdispFin(dv, sn, bp);
	} else if (an == 4) {
		sB.style.visibility = 'hidden';
		sB.style[p7BAM.prf + 'transition'] = null;
		sB.style[p7BAM.prf + 'transform'] = null;
		sB.style.opacity = 0;
		sB.style.left = '0px';
		sB.style.top = '0px';
		P7_BAMremClass(sB, 'bam-run');
		tD.bamKBnum++;
		tD.bamKBnum = (tD.bamKBnum > 5) ? 1 : tD.bamKBnum;
		cl = 'bam-burns-' + tD.bamKBnum;
		if (sB.bamKB) {
			P7_BAMremClass(sB, sB.bamKB);
		}
		sB.bamKB = cl;
		P7_BAMsetClass(sB, cl);
		sB.offsetWidth = sB.offsetWidth;
		sB.style.visibility = 'visible';
		if (tD.bamShowMode == 'play' || bp != 1) {
			sB.style[p7BAM.prf + 'transition'] = 'transform ' + tD.bamOpt[9] + 's linear, opacity 3s linear';
			P7_BAMsetClass(sB, 'bam-run');
			sB.style.opacity = 1;
		} else {
			sB.style.opacity = 1;
		}
		P7_BAMdispFin(dv, sn, bp);
	} else if (an > 4) {
		sB.style.visibility = 'hidden';
		sB.style[p7BAM.prf + 'transition'] = null;
		sB.style.left = '0px';
		sB.style.top = '0px';
		P7_BAMremClass(sB, 'bam-multi-show');
		P7_BAMremClass(sB, 'bam-multi-close');
		if (an == 5) {
			tD.bamMLnum++;
			tD.bamMLnum = (tD.bamMLnum > 5) ? 1 : tD.bamMLnum;
		} else {
			tD.bamMLnum = an - 5;
		}
		cl = 'bam-multi-' + tD.bamMLnum;
		if (sB.bamML) {
			P7_BAMremClass(sB, sB.bamML);
		}
		sB.bamML = cl;
		P7_BAMsetClass(sB, cl);
		sB.offsetWidth = sB.offsetWidth;
		sB.style.visibility = 'visible';
		if (bp != 1) {
			sB.style[p7BAM.prf + 'transition'] = 'transform ' + dur + 'ms ease, opacity ' + (dur * 1.4) + 'ms ease';
		}
		P7_BAMsetClass(sB, 'bam-multi-show');
		P7_BAMdispFin(dv, sn, bp);
	} else {
		sB.style.left = '0px';
		sB.style.top = '0px';
		sB.style.visibility = 'visible';
		P7_BAMdispFin(dv, sn, bp);
	}
	if (tD.bamPrevSlideNum != sn) {
		P7_BAMcloseSlide(dv, tD.bamPrevSlideNum, 0);
	}
}

function P7_BAMcloseSlide(dv, sn, bp){
	var tD, sB, an, dur, x;
	bp = (bp) ? bp : null;
	tD = document.getElementById(dv);
	if (sn > 0) {
		sB = tD.bamSlides[sn];
	} else {
		return;
	}
	if (!sB) {
		return;
	}
	an = (bp && bp == 1) ? 0 : tD.bamOpt[2];
	dur = tD.bamOpt[3];
	P7_BAMremClass(sB, 'current-slide');
	if (an == 1) {
		if (!sB.style[p7BAM.prf + 'transition']) {
			sB.style[p7BAM.prf + 'transition'] = 'opacity ' + dur + 'ms linear';
		}
		sB.style.opacity = 0;
		sB.bamAnimC = setTimeout(function(){
			P7_BAMcloseSlideBox(dv, sB);
		}, dur);
	} else if (an == 2) {
		x = sB.offsetWidth * -1;
		if (tD.bamDirection == 'left') {
			x = x * -1;
		}
		if (!sB.style[p7BAM.prf + 'transition']) {
			sB.style[p7BAM.prf + 'transition'] = 'left ' + dur + 'ms ease-out';
		}
		sB.style.left = x + 'px';
		sB.bamAnimC = setTimeout(function(){
			P7_BAMcloseSlideBox(dv, sB);
		}, dur);
	} else if (an == 3) {
		x = sB.offsetWidth * -1;
		if (tD.bamDirection == 'left') {
			x = x * -1;
		}
		sB.style.opacity = 1;
		sB.offsetWidth = sB.offsetWidth;
		if (!sB.style[p7BAM.prf + 'transition']) {
			sB.style[p7BAM.prf + 'transition'] = 'left ' + dur + 'ms ease, opacity ' + dur + 'ms ease';
		}
		sB.style.left = x + 'px';
		sB.style.opacity = 0;
		sB.bamAnimC = setTimeout(function(){
			P7_BAMcloseSlideBox(dv, sB);
		}, dur);
	} else if (an == 4) {
		dur = 3000;
		sB.style.opacity = 0;
		sB.bamAnimC = setTimeout(function(){
			P7_BAMcloseSlideBox(dv, sB);
		}, dur);
	} else if (an > 4) {
		sB.style[p7BAM.prf + 'transition'] = 'transform ' + dur + 'ms ease, opacity ' + dur + 'ms ease';
		sB.offsetWidth = sB.offsetWidth;
		P7_BAMsetClass(sB, 'bam-multi-close');
		sB.bamAnimC = setTimeout(function(){
			P7_BAMcloseSlideBox(dv, sB);
		}, dur);
	} else {
		sB.style.visibility = 'hidden';
	}
}

function P7_BAMcloseSlideBox(dv, sB){
	var tD;
	tD = document.getElementById(dv);
	if (tD.bamCurrSlide == sB) {
		return false;
	}
	sB.style.visibility = 'hidden';
	P7_BAMremClass(sB, 'current-slide');
	if (tD.bamOpt[2] > 1 && p7BAM.prf != 'none') {
		sB.style[p7BAM.prf + 'transition'] = null;
		sB.offsetWidth = sB.offsetWidth;
	}
	if (tD.bamOpt[2] == 4) {
		P7_BAMremClass(sB, 'bam-run');
		sB.offsetWidth = sB.offsetWidth;
	}
	if (tD.bamOpt[2] > 4) {
		P7_BAMremClass(sB, 'bam-multi-show');
		P7_BAMremClass(sB, 'bam-multi-close');
		sB.offsetWidth = sB.offsetWidth;
	}
}

function P7_BAMdispFin(dv, sn, bp){
	var tD, ns, tA, tm, sB;
	tD = document.getElementById(dv);
	ns = parseInt(tD.bamCurrSlideNum, 10) + 1;
	ns = (ns <= tD.bamSlides.length - 1) ? ns : 1;
	tA = tD.bamList[ns];
	if (!tA.bamPreImage.cmp) {
		tA.bamPreImage.src = tA.href;
	}
	tm = tD.bamOpt[5] * 1000;
	if (tD.bamShowMode == 'play') {
		tD.bamShowMode = 'play';
		tD.bamShowResume = false;
		if (tD.bamShowTimer) {
			clearTimeout(tD.bamShowTimer);
		}
		tD.bamShowTimer = setTimeout("P7_BAMcontrol('" + tD.id + "','next',2)", tm);
	}
}

function P7_BAMsetImage(im){
	im.p7Status = '';
	im.onload = function(){
		this.cmp = true;
	};
	im.onerror = function(){
		this.cmp = false;
		this.p7Status = 'load_error';
	};
}

function P7_BAMurl(dv){
	var tB, h, s, i, d, x, sp, n = dv.replace('p7BAM_', '');
	tB = document.getElementById(dv);
	h = document.location.search;
	if (h) {
		h = h.replace('?', '');
		s = h.split(/[=&]/g);
		if (s && s.length) {
			for (i = 0; i < s.length; i += 2) {
				if (s[i] == d) {
					x = s[i + 1];
					sp = x.split('_');
					if (sp.length != 2 || n != sp[0]) {
						x = false;
					}
					if (sp && sp.length == 2) {
						tB.bamDefImage = sp[1];
					}
				}
			}
		}
	}
	h = document.location.hash;
	if (h) {
		x = h.substring(1, h.length);
		if (n != x.charAt(3)) {
			x = false;
		}
		if (x && x.indexOf(d) === 0 && x.length > 5) {
			tB.bamDefImage = P7_BAMparsePN(x);
		}
	}
}

function P7_BAMrandomize(){
	return 0.5 - Math.random();
}

function P7_BAMrandomizer(ul){
	var i, tI = [], cn, k = 0, rn;
	cn = ul.childNodes;
	for (i = 0; i < cn.length; i++) {
		tI[i] = cn[i];
	}
	tI.sort(P7_BAMrandomize);
	while (k < tI.length) {
		ul.appendChild(tI[k]);
		k++;
	}
}

function P7_BAMgetByAttribute(att, cls){
	var i, nL = [], aT, rS = [], cl, el;
	if (document.querySelectorAll) {
		nL = document.querySelectorAll('*[' + att + ']');
	} else {
		if (typeof(document.getElementsByClassName) != 'function') {
			aT = document.getElementsByTagName('*');
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

function P7_BAMsetClass(ob, cl){
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

function P7_BAMremClass(ob, cl){
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
			if (nc === '' || nc === ' ') {
				ob.removeAttribute('class');
			} else {
				ob.className = nc;
			}
		}
	}
}

function P7_BAMgetCSSPre(){
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

function P7_BAMgetStyle(el, s){
	if (el.currentStyle) {
		s = el.currentStyle[s];
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		s = document.defaultView.getComputedStyle(el, "")[s];
	} else {
		s = el.style[s];
	}
	return s;
}

function P7_BAMsetCC(dd, rp, ac){
	var d, tC;
	d = dd.replace('_', rp);
	tC = document.getElementById(d);
	if (tC) {
		tC.onclick = function(){
			return P7_BAMcontrol(dd, ac);
		};
	}
	return tC;
}

function P7_BAMparsePN(d){
	var x = d.lastIndexOf('_');
	return parseInt(d.substr(x + 1), 10);
}
