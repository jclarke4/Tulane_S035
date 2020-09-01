
/* 
 ================================================
 PVII Image Rotator Magic 2 scripts
 Copyright (c) 2014-2016 Project Seven Development
 www.projectseven.com
 Version: 2.1.7 -build 11
 ================================================
 
 */

var p7IR2 = {
	ctl: [],
	status: false,
	once: false,
	prf: 'none',
	boxAnimDuration: 400,
	swipeDuration: 400,
	animDelay: (1000 / 60)
};
function P7_IR2set(){
	var i, h, sh = '', ie = P7_IR2getIEver();
	if (!document.getElementById || (ie > 4 && ie < 6)) {
		return;
	}
	sh += 'div.p7ir2-box {overflow:hidden;padding:0;margin:0;border:0;}\n';
	sh += 'div.p7ir2-slide {height:auto;width:100%;top:0;left:0;overflow:hidden;padding:0;margin:0;}\n';
	sh += '.p7ir2-image {filter:inherit;}\n';
	sh += '.p7ir2-paginator {display:block !important;}\n';
	sh += '.p7ir2-toolbar {display:block !important;}\n';
	sh += '.p7ir2-arrows {display:block !important;}\n';
	sh += '.p7ir2-image.p7ir2-max {width:auto !important;max-width:100%;margin:auto;}\n';
	sh += '.p7ir2-pointer {touch-action: pan-y pinch-zoom;}\n';
	sh += '.p7ir2-ms-pointer {ms-touch-action: pan-y pinch-zoom;}\n';
	p7IR2.prf = P7_IR2getCSSPre();
	P7_IR2addSheet(sh);
}

P7_IR2set();
function P7_IR2op(){
	if (!document.getElementById) {
		return;
	}
	p7IR2.ctl[p7IR2.ctl.length] = arguments;
}

function P7_IR2bb(){
}

function P7_IR2addLoad(){
	var ie = P7_IR2getIEver();
	if (!document.getElementById || (ie > 4 && ie < 6)) {
		return;
	}
	if (window.addEventListener) {
		document.addEventListener("DOMContentLoaded", P7_IR2init, false);
		window.addEventListener("load", P7_IR2init, false);
		window.addEventListener("unload", P7_IR2bb, false);
		window.addEventListener("resize", P7_IR2rsz, false);
	} else if (window.attachEvent) {
		document.write("<script id=p7ie_ir2 defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_ir2").onreadystatechange = function(){
			if (this.readyState == "complete") {
				if (p7IR2.ctl.length > 0) {
					P7_IR2init();
				}
			}
		};
		window.attachEvent("onload", P7_IR2init);
		window.attachEvent("onunload", P7_IR2bb);
		window.attachEvent("onresize", P7_IR2rsz);
	}
}

P7_IR2addLoad();
function P7_IR2init(){
	var i, j, k, tD, bx, el, tU, tA, tC, ie, pli = 0, cN, tR, cl, md;
	if (p7IR2.ctl.length < 1) {
		return;
	}
	if (p7IR2.once) {
		return;
	}
	p7IR2.once = true;
	document.p7ir2pre = [];
	ie = P7_IR2getIEver();
	for (j = 0; j < p7IR2.ctl.length; j++) {
		tD = document.getElementById(p7IR2.ctl[j][0]);
		if (tD) {
			tD.p7opt = p7IR2.ctl[j];
			el = document.createElement('div');
			el.setAttribute('id', tD.id.replace('_', 'ldg_'));
			el.className = 'p7ir2-loading';
			tD.ir2Loading = el;
			tD.appendChild(el);
			if (p7IR2.prf == 'none' && tD.p7opt[1] > 3) {
				tD.p7opt[1] = 1;
			}
			if (tD.p7opt[1] != 2 && ie > 4 && ie < 8) {
				tD.p7opt[1] = 0;
			}
			tD.ir2ShowMode = 'pause';
			bx = document.getElementById(tD.id.replace('_', 'box_'));
			tD.ir2Box = bx;
			bx.ir2Div = tD;
			tD.ir2Controls = [];
			tD.ir2Slides = [];
			tD.ir2CurrentSlideNum = 0;
			tD.ir2NumPlays = 1;
			tU = document.getElementById(tD.id.replace('_', 'list_'));
			if (tD.p7opt[3] === 0) {
				P7_IR2randomizer(tU);
				tD.p7opt[3] = 1;
			}
			tA = tU.getElementsByTagName('A');
			k = 0;
			for (i = 0; i < tA.length; i++) {
				if (tA[i].parentNode.nodeName == "LI") {
					k++;
					tD.ir2Slides[k] = tA[i];
					tA[i].ir2Div = tD.id;
					tA[i].ir2SlideNum = k;
					tD.ir2SlideNums = tD.ir2Slides.length - 1;
					document.p7ir2pre[pli] = new Image();
					document.p7ir2pre[pli].cmp = false;
					document.p7ir2pre[pli].ir2Div = tD.id;
					tA[i].ir2PreIndex = pli;
					tA[i].ir2PreImage = document.p7ir2pre[pli];
					if (k < 2) {
						document.p7ir2pre[pli].src = tA[i].href;
					}
					pli++;
					tA[i].ir2Desc = false;
					cN = tA[i].parentNode.childNodes;
					for (var kk = 0; kk < cN.length; kk++) {
						cl = cN[kk].className;
						if (cl && /ir2_desc/i.test(cl)) {
							tA[i].ir2Desc = cN[kk].innerHTML;
							tA[i].ir2DescClass = 'p7ir2-description' + cl.replace('p7ir2_desc', '');
						}
						if (cl && /ir2_link/i.test(cl)) {
							el = cN[kk].getElementsByTagName('A');
							if (el && el[0]) {
								tA[i].ir2Link = el[0];
							}
						}
					}
				}
			}
			tD.ir2Swipe = false;
			P7_IR2bindSwipe(tD.ir2Box, function(dir){
				var tD = this.ir2Div;
				tD.ir2Swipe = true;
				if (dir == 'left') {
					P7_IR2control(tD.id, 'next', null, true);
				} else if (dir == 'right') {
					P7_IR2control(tD.id, 'prev', null, true);
				}
			});
			tD.ir2Paginators = [];
			el = document.getElementById(tD.id.replace('_', 'pg_'));
			if (el) {
				tA = el.getElementsByTagName('A');
				if (tA) {
					for (k = 0; k < tA.length; k++) {
						if (tA[k].id && tA[k].id.indexOf('p7IR2pg') === 0 && tA[k].id.indexOf('p7IR2pgpp_') == -1) {
							tA[k].ir2Div = tD.id;
							tA[k].ir2SlideNum = P7_IR2parsePN(tA[k].id);
							tD.ir2Paginators[tD.ir2Paginators.length] = tA[k];
							tA[k].onclick = function(){
								return P7_IR2paginator(this);
							};
						}
					}
				}
			}
			el = document.getElementById(tD.id.replace('_', 'pgpp_'));
			if (el) {
				el.p7state = 'pause';
				el.ir2Div = tD.id;
				tD.ir2Controls[7] = el;
				el.onclick = function(){
					var ac = (this.p7state == 'play') ? 'pause' : 'play';
					P7_IR2control(this.ir2Div, ac);
					return false;
				};
				el.ir2SetButtonState = function(st){
					var tx;
					if (st == 'play') {
						tx = 'Pause';
						P7_IR2remClass(this, 'play');
					} else {
						tx = 'Play';
						P7_IR2setClass(this, 'play');
					}
					this.innerHTML = tx;
					this.setAttribute('title', tx);
				};
			}
			tD.ir2Controls[0] = P7_IR2setCC(tD.id, 'bp_', 'prev');
			tD.ir2Controls[1] = P7_IR2setCC(tD.id, 'bn_', 'next');
			tD.ir2Controls[3] = P7_IR2setCC(tD.id, 'rp_', 'prev');
			tD.ir2Controls[5] = P7_IR2setCC(tD.id, 'rn_', 'next');
			el = document.getElementById(tD.id.replace('_', 'rpp_'));
			if (el) {
				el.p7state = 'pause';
				el.ir2Div = tD.id;
				tD.ir2Controls[4] = el;
				el.onclick = function(){
					var ac = (this.p7state == 'play') ? 'pause' : 'play';
					P7_IR2control(this.ir2Div, ac);
					return false;
				};
				el.ir2SetButtonState = function(st){
					var tx;
					if (st == 'play') {
						tx = 'Pause';
						P7_IR2remClass(this, 'play');
					} else {
						tx = 'Play';
						P7_IR2setClass(this, 'play');
					}
					this.setAttribute('title', tx);
				};
			}
			if (tD.p7opt[10] == 1) {
				tD.ir2ShowResume = false;
				tD.ir2Box.onmouseover = function(){
					var tD, d = this.id.replace('box', '');
					tD = document.getElementById(d);
					if (tD.ir2ShowMode == 'play') {
						tD.ir2ShowResume = true;
						P7_IR2pause(d);
					}
				};
				tD.onmouseout = function(evt){
					if (this.ir2ShowResume) {
						var tg, pp, m = true, d;
						d = this.id;
						evt = (evt) ? evt : event;
						tg = (evt.toElement) ? evt.toElement : evt.relatedTarget;
						if (tg) {
							pp = tg;
							while (pp) {
								if (pp.id && pp.id.indexOf(d) === 0) {
									m = false;
									break;
								}
								pp = pp.parentNode;
							}
						}
						if (m) {
							this.ir2ShowResume = false;
							if (this.ir2ShowTimer) {
								clearTimeout(this.ir2ShowTimer);
							}
							this.ir2ShowMode = 'play';
							if (this.ir2ShowTimer) {
								clearTimeout(this.ir2ShowTimer);
							}
							this.ir2ShowTimer = setTimeout("P7_IR2control('" + this.id + "','play')", 1000);
						}
					}
				};
			}
			tD.ir2CurrentSlideNum = tD.p7opt[3];
			P7_IR2url(tD.id);
			if (tD.ir2CurrentSlideNum < 0 || tD.ir2CurrentSlideNum > tD.ir2Slides.length) {
				tD.ir2CurrentSlideNum = 1;
			}
			tD.ir2Init = true;
			if (tD.p7opt[4] == 1) {
				tD.ir2ShowMode = 'play';
				if (tD.ir2Controls[4]) {
					tD.ir2Controls[4].p7state = 'play';
					tD.ir2Controls[4].ir2SetButtonState('play');
				}
				if (tD.ir2Controls[7]) {
					tD.ir2Controls[7].p7state = 'play';
					tD.ir2Controls[7].ir2SetButtonState('play');
				}
			}
			P7_IR2showImage(tD.id, tD.ir2CurrentSlideNum, 1);
		}
	}
}

function P7_IR2ctrl(dv, ac){
	return P7_IR2control(dv, ac);
}

function P7_IR2control(dv, ac, bp, tch){
	var i, tD, cs, ts, op, sn, eI, eC, eD, tm = 0, pauseOnAction, rs = false, m = false;
	tD = document.getElementById(dv);
	if (tD && tD.ir2Slides) {
		if (tD.ir2ShowTimer) {
			clearTimeout(tD.ir2ShowTimer);
		}
		pauseOnAction = (tD.p7opt[8] == 1) ? true : false;
		cs = tD.ir2CurrentSlideNum;
		ts = tD.ir2SlideNums;
		if (ac == 'pause') {
			P7_IR2pause(dv);
			return m;
		}
		if (!bp && pauseOnAction) {
			P7_IR2pause(dv);
			tD.ir2ShowResume = false;
		}
		if (ac == 'play') {
			tD.ir2ShowMode = 'play';
			tD.ir2ShowResume = false;
			if (tD.ir2Controls[4]) {
				tD.ir2Controls[4].p7state = 'play';
				tD.ir2Controls[4].ir2SetButtonState('play');
			}
			if (tD.ir2Controls[7]) {
				tD.ir2Controls[7].p7state = 'play';
				tD.ir2Controls[7].ir2SetButtonState('play');
			}
			ac = 'next';
			rs = true;
		}
		if (ac == 'first') {
			tD.ir2Direction = 'left';
			sn = 1;
		} else if (ac == 'prev') {
			tD.ir2Direction = 'left';
			sn = cs - 1;
			if (sn < 1) {
				sn = ts;
			}
		} else if (ac == 'next') {
			sn = cs + 1;
			tD.ir2Direction = 'right';
			if (tD.ir2ShowMode == 'play') {
				if (sn > ts) {
					tD.ir2NumPlays++;
					if (tD.p7opt[6] > 0 && tD.ir2NumPlays > tD.p7opt[6]) {
						tD.ir2NumPlays = 0;
						sn = (tD.p7opt[7] == 1) ? 1 : tD.ir2SlideNums;
						P7_IR2pause(tD.id);
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
			tD.ir2Direction = 'right';
			sn = ts;
		} else {
			tD.ir2Direction = 'right';
			sn = ac;
		}
		sn = (sn < 1) ? 1 : sn;
		sn = (sn > tD.ir2SlideNums) ? tD.ir2SlideNums : sn;
		if (sn == tD.ir2CurrentSlideNum && bp != 1) {
			return m;
		}
		if (rs) {
			tm = 100;
			setTimeout("P7_IR2showImage('" + tD.id + "'," + sn + "," + bp + ")", tm);
		} else {
			P7_IR2showImage(tD.id, sn, bp, tch);
		}
	}
	return false;
}

function P7_IR2pause(d){
	var cD, tD = document.getElementById(d);
	if (tD) {
		tD.ir2ShowMode = 'pause';
		if (tD.ir2ShowTimer) {
			clearTimeout(tD.ir2ShowTimer);
		}
		if (tD.ir2Controls[4]) {
			tD.ir2Controls[4].p7state = 'pause';
			tD.ir2Controls[4].ir2SetButtonState('pause');
		}
		if (tD.ir2Controls[7]) {
			tD.ir2Controls[7].p7state = 'pause';
			tD.ir2Controls[7].ir2SetButtonState('pause');
		}
	}
}

function P7_IR2paginator(a){
	P7_IR2control(a.ir2Div, a.ir2SlideNum);
	return false;
}

function P7_IR2setPaginators(d){
	var i, tD, tA;
	tD = document.getElementById(d);
	tA = tD.ir2Paginators;
	for (i = 0; i < tA.length; i++) {
		if (tA[i]) {
			P7_IR2remClass(tA[i], 'down');
			if (tA[i].ir2SlideNum == tD.ir2CurrentSlideNum) {
				P7_IR2setClass(tA[i], 'down');
			}
		}
	}
}

function P7_IR2showImage(dv, sn, bp, tch){
	var i, tD, tA, tB, sW, iM, aM, el;
	bp = (bp) ? bp : null;
	tD = document.getElementById(dv);
	if (tD.ir2CurrentSlideNum == sn && bp != 1) {
		return false;
	}
	if (tD.ir2ShowTimer) {
		clearTimeout(tD.ir2ShowTimer);
	}
	if (tD.ir2Wait) {
		clearTimeout(tD.ir2Wait);
	}
	tD.ir2CurrentSlideNum = sn;
	P7_IR2setPaginators(tD.id);
	tA = tD.ir2Slides[sn];
	tB = tD.ir2Box;
	tB.style.height = P7_IR2getDim(tB, 'height') + 'px';
	sW = document.createElement('div');
	sW.className = 'p7ir2-slide';
	sW.ir2Div = tD;
	sW.ir2Box = tB;
	sW.style.position = 'absolute';
	sW.style.visibility = 'hidden';
	aM = document.createElement('A');
	aM.className = 'p7ir2-image-link';
	if (tA.ir2Link) {
		aM.setAttribute('href', tA.ir2Link.getAttribute('href'));
		aM.setAttribute('title', tA.ir2Link.innerHTML);
		if (tA.ir2Link.target && tA.ir2Link.target !== '') {
			aM.setAttribute('target', tA.ir2Link.target);
		}
	}
	iM = document.createElement('IMG');
	iM.className = 'p7ir2-image';
	P7_IR2setImage(iM);
	iM.ir2Cnt = 0;
	iM.src = tA.href;
	if (tD.p7opt[11] > 0) {
		P7_IR2setClass(iM, 'p7ir2-max');
		iM.style.maxHeight = tD.p7opt[11] + 'px';
	}
	iM.oncontextmenu = function(){
		return false;
	};
	aM.appendChild(iM);
	sW.appendChild(aM);
	sW.ir2Desc = tA.ir2Desc;
	if (sW.ir2Desc) {
		el = document.createElement('div');
		el.className = tA.ir2DescClass;
		sW.appendChild(el);
		sW.ir2Description = el;
		sW.ir2Description.innerHTML = sW.ir2Desc;
	}
	tB.appendChild(sW);
	sW.ir2Image = iM;
	tD.ir2Wait = setInterval(function(){
		P7_IR2loadImage(tD, sW, iM, sn, bp, tch);
	}, 60);
}

function P7_IR2loadImage(tD, sW, im, sn, bp, tch){
	im.ir2Cnt++;
	if (im.cmp && im.complete && im.height > 10 && im.width > 10) {
		clearTimeout(tD.ir2Wait);
		tD.ir2Loading.style.display = 'none';
		P7_IR2dispA(tD.id, sn, sW, bp, tch);
	} else {
		if (im.ir2Cnt > 3) {
			tD.ir2Loading.style.display = 'block';
		}
	}
	if (im.ir2Cnt > 100) {
		clearTimeout(tD.ir2Wait);
		if (tD.ir2ShowMode == 'play') {
			if (tD.ir2ShowTimer) {
				clearTimeout(tD.ir2ShowTimer);
			}
			tD.ir2ShowTimer = setTimeout("P7_IR2control('" + tD.id + "','next',2)", 200);
		}
	}
}

function P7_IR2setImage(im){
	this.p7Status = '';
	im.onload = function(){
		this.cmp = true;
	};
	im.onerror = function(){
		this.p7Status = 'load_error';
	};
}

function P7_IR2dispA(dv, sn, sW, bp, tch){
	var tD, bX, an, x, dur, fh, th, trsnd;
	tD = document.getElementById(dv);
	bX = tD.ir2Box;
	if (tD.ir2CurrentSlideNum != sn) {
		return false;
	}
	an = (bp && bp == 1) ? 0 : tD.p7opt[1];
	dur = tD.p7opt[2];
	trsnd = (p7IR2.prf == '-webkit-' ? 'webkitTransitionEnd' : 'transitionend');
	sW.ir2ImgHeight = sW.ir2Image.height;
	sW.ir2ImgWidth = sW.ir2Image.width;
	sW.ir2State = 'current';
	P7_IR2setClass(sW, 'current-slide');
	bX.ir2CurrentSlide = sW;
	if (an > 0) {
		bX.ir2AdjH = false;
		fh = P7_IR2getDim(sW.ir2Box, 'height');
		th = P7_IR2getDim(sW, 'height');
		bX.ir2StartHeight = fh;
		bX.ir2FinHeight = th;
		if (Math.abs(th - fh) > 1) {
			if (th > fh) {
				bX.ir2AdjH = true;
			} else if (fh != th) {
				P7_IR2animate(bX, 'height', 'px', fh, th, 300, 'linear');
			}
		}
	}
	if (tch) {
		an = 2;
		dur = p7IR2.swipeDuration;
	}
	if (an == 1) {
		P7_IR2fade(sW, 5, 100, dur, 'quad', function(){
			P7_IR2dispB(this);
		});
		P7_IR2dispFin(dv, sn, bp);
	} else if (an == 2) {
		x = sW.offsetWidth;
		if (tD.ir2Direction == 'left') {
			x = x * -1;
		}
		sW.style.left = x + 'px';
		P7_IR2animate(sW, 'left', 'px', x, 0, dur, 'quad', function(){
			P7_IR2dispB(this);
		});
		P7_IR2dispFin(dv, sn, bp);
	} else if (an == 3) {
		x = sW.offsetHeight;
		if (tD.ir2Direction == 'left') {
			x = x * -1;
		}
		sW.style.top = x + 'px';
		P7_IR2animate(sW, 'top', 'px', x, 0, dur, 'quad', function(){
			P7_IR2dispB(this);
		});
		P7_IR2dispFin(dv, sn, bp);
	} else if (an == 4) {
		x = 100;
		if (tD.ir2Direction == 'left') {
			x = x * -1;
		}
		sW.style.left = x + 'px';
		sW.style.opacity = 0;
		sW.style.visibility = 'visible';
		sW.offsetWidth = sW.offsetWidth;
		sW.style[p7IR2.prf + 'transition'] = 'all ' + dur + 'ms ease-out';
		if (sW.ir2animB) {
			clearTimeout(sW.ir2animB);
		}
		sW.ir2animB = setTimeout(function(){
			P7_IR2dispB(sW);
		}, dur);
		sW.style.left = '0px';
		sW.style.opacity = 1;
		P7_IR2dispFin(dv, sn, bp);
	} else if (an == 5) {
		sW.style[p7IR2.prf + 'transform'] = 'scale(0.1,1)';
		sW.style.opacity = 1;
		sW.style.visibility = 'visible';
		sW.offsetWidth = sW.offsetWidth;
		sW.style[p7IR2.prf + 'transition'] = 'all ' + dur + 'ms linear';
		if (sW.ir2animB) {
			clearTimeout(sW.ir2animB);
		}
		sW.ir2animB = setTimeout(function(){
			P7_IR2dispB(sW);
		}, dur);
		sW.style[p7IR2.prf + 'transform'] = 'scale(1,1)';
		P7_IR2dispFin(dv, sn, bp);
	} else if (an == 6) {
		sW.style[p7IR2.prf + 'transform'] = 'scale(0.1,0.1)';
		sW.style.opacity = 1;
		sW.style.visibility = 'visible';
		sW.offsetWidth = sW.offsetWidth;
		sW.style[p7IR2.prf + 'transition'] = 'all ' + dur + 'ms linear';
		if (sW.ir2animB) {
			clearTimeout(sW.ir2animB);
		}
		sW.ir2animB = setTimeout(function(){
			P7_IR2dispB(sW);
		}, dur);
		sW.style[p7IR2.prf + 'transform'] = 'scale(1,1)';
		P7_IR2dispFin(dv, sn, bp);
	} else {
		sW.style.visibility = 'visible';
		tD.ir2Box.style.height = P7_IR2getDim(tD.ir2Box.ir2CurrentSlide, 'height') + 'px';
		P7_IR2dispFin(dv, sn, bp);
	}
	P7_IR2hideSlide(tD, null, tch, bp);
}

function P7_IR2dispB(sW){
	var fh, th;
	if (!sW || sW.parentNode.ir2CurrentSlide != sW) {
		return;
	}
	if (sW.parentNode.ir2AdjH) {
		fh = sW.ir2Box.ir2StartHeight;
		th = sW.ir2Box.ir2FinHeight;
		if (Math.abs(fh - th) > 1) {
			P7_IR2animate(sW.ir2Box, 'height', 'px', fh, th, 300, 'linear', function(){
			});
		}
	}
}

function P7_IR2getDim(el, d){
	var b, x;
	b = el.getBoundingClientRect();
	x = b.bottom - b.top;
	return x;
}

function P7_IR2dispFin(dv, sn, bp){
	var tD, ns, tA, tm;
	tD = document.getElementById(dv);
	if (tD.ir2CurrentSlideNum != sn) {
		return false;
	}
	tm = tD.p7opt[5] * 1000;
	if (tD.ir2Init) {
		tD.ir2Init = false;
		tm = tD.p7opt[9] * 1000;
	}
	ns = tD.ir2CurrentSlideNum + 1;
	ns = (ns <= tD.ir2Slides.length - 1) ? ns : 1;
	tA = tD.ir2Slides[ns];
	if (!tA.ir2PreImage.cmp) {
		tA.ir2PreImage.src = tA.href;
	}
	if (tD.ir2ShowMode == 'play') {
		tD.ir2ShowMode = 'play';
		tD.ir2ShowResume = false;
		if (tD.ir2ShowTimer) {
			clearTimeout(tD.ir2ShowTimer);
		}
		tD.ir2ShowTimer = setTimeout("P7_IR2control('" + tD.id + "','next',2)", tm);
	}
}

function P7_IR2removeSlide(bX, op){
	op = (op > -1) ? op : 1;
	if (bX.hasChildNodes()) {
		while (bX.childNodes.length > op) {
			bX.removeChild(bX.childNodes[0]);
		}
	}
}

function P7_IR2hideSlide(tD, ac, tch, bp){
	var x, bX, sW, trsnd, op, an, dur, dV;
	an = (tch) ? 2 : tD.p7opt[1];
	an = (bp == 1) ? 0 : an;
	dur = (tch) ? p7IR2.swipeDuration : tD.p7opt[2];
	op = (ac == 'all') ? 0 : 1;
	trsnd = (p7IR2.prf == '-webkit-' ? 'webkitTransitionEnd' : 'transitionend');
	bX = tD.ir2Box;
	dV = bX.getElementsByTagName('div');
	if (dV && dV.length > op) {
		sW = dV[0];
		sW.ir2State = 'closed';
		sW.style.position = 'absolute';
		P7_IR2setClass(sW, 'closed-slide');
		if (an == 1) {
			P7_IR2fade(sW, 100, 0, dur, 'quad', function(){
				P7_IR2removeSlide(bX, op);
			});
		} else if (an == 2) {
			x = bX.offsetWidth * -1;
			if (tD.ir2Direction == 'left') {
				x = x * -1;
			}
			P7_IR2animate(sW, 'left', 'px', 0, x, dur, 'quad', function(){
				P7_IR2removeSlide(bX, op);
			});
		} else if (an == 3) {
			x = bX.offsetHeight * -1;
			if (tD.ir2Direction == 'left') {
				x = x * -1;
			}
			P7_IR2animate(sW, 'top', 'px', 0, x, dur, 'quad', function(){
				P7_IR2removeSlide(bX, op);
			});
		} else if (an == 4) {
			x = -100;
			if (tD.ir2Direction == 'left') {
				x = x * -1;
			}
			sW.offsetWidth = sW.offsetWidth;
			sW.style[p7IR2.prf + 'transition'] = 'all ' + dur + 'ms ease-out';
			if (sW.ir2animB) {
				clearTimeout(sW.ir2animB);
			}
			sW.ir2animB = setTimeout(function(){
				P7_IR2removeSlide(bX, op);
			}, dur);
			sW.style.left = x + 'px';
			sW.style.opacity = 0.6;
		} else if (an == 5) {
			sW.offsetWidth = sW.offsetWidth;
			sW.style[p7IR2.prf + 'transition'] = 'all ' + dur + 'ms ease-out';
			if (sW.ir2animB) {
				clearTimeout(sW.ir2animB);
			}
			sW.ir2animB = setTimeout(function(){
				P7_IR2removeSlide(bX, op);
			}, dur);
			sW.style.opacity = 0.2;
		} else if (an == 6) {
			sW.offsetWidth = sW.offsetWidth;
			sW.style[p7IR2.prf + 'transition'] = 'all ' + dur + 'ms ease-out';
			if (sW.ir2animB) {
				clearTimeout(sW.ir2animB);
			}
			sW.ir2animB = setTimeout(function(){
				P7_IR2removeSlide(bX, op);
			}, dur);
			sW.style.opacity = 0.2;
		} else {
			P7_IR2removeSlide(bX, op);
		}
	}
}

function P7_IR2getTime(st){
	var d = new Date();
	return d.getTime() - st;
}

function P7_IR2anim(tp, t, b, c, d){
	if (tp == 'quad') {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		} else {
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	} else {
		return (c * (t / d)) + b;
	}
}

function P7_IR2fade(ob, from, to, dur, typ, cb){
	if (ob.p7FadeRunning) {
		clearInterval(ob.p7Fade);
		ob.p7FadeRunning = false;
	}
	typ = (!typ) ? 'quad' : typ;
	ob.p7fadeType = typ;
	ob.p7StartFade = from;
	ob.p7FinishFade = to;
	ob.p7CurrentFade = ob.p7StartFade;
	if (ob.filters) {
		ob.style.filter = 'alpha(opacity=' + ob.p7CurrentFade + ')';
	} else {
		ob.style.opacity = ob.p7CurrentFade / 100;
	}
	ob.style.visibility = 'visible';
	ob.fadeStartTime = P7_IR2getTime(0);
	ob.fadeDuration = dur;
	ob.p7FadeRunning = true;
	ob.p7Fade = setInterval(function(){
		P7_IR2fader(ob, cb);
	}, p7IR2.animDelay);
}

function P7_IR2fader(el, cb){
	var i, tC, tA, op, et, cet, m = false;
	et = P7_IR2getTime(el.fadeStartTime);
	if (et >= el.fadeDuration) {
		et = el.fadeDuration;
		m = true;
	}
	if (el.p7CurrentFade != el.p7FinishFade) {
		op = P7_IR2anim(el.p7fadeType, et, el.p7StartFade, el.p7FinishFade - el.p7StartFade, el.fadeDuration);
		el.p7CurrentFade = op;
		if (el.filters) {
			el.style.filter = 'alpha(opacity=' + el.p7CurrentFade + ')';
		} else {
			el.style.opacity = el.p7CurrentFade / 100;
		}
	}
	if (m) {
		el.p7FadeRunning = false;
		clearInterval(el.p7Fade);
		if (el.filters) {
			el.style.filter = '';
		} else {
			el.style.opacity = 1;
		}
		if (cb && typeof(cb) === "function") {
			cb.call(el);
		}
	}
}

function P7_IR2animate(ob, prop, un, fv, tv, dur, typ, cb){
	if (ob.p7AnimRunning) {
		ob.p7AnimRunning = false;
		clearInterval(ob.p7IR2anim);
	}
	typ = (!typ) ? 'quad' : typ;
	ob.p7animType = typ;
	ob.p7animProp = prop;
	ob.p7animUnit = un;
	ob.p7animStartVal = fv;
	ob.p7animCurrentVal = ob.p7animStartVal;
	ob.p7animFinishVal = tv;
	ob.style[ob.p7animProp] = ob.p7animCurrentVal + ob.p7animUnit;
	ob.style.visibility = 'visible';
	ob.p7animStartTime = P7_IR2getTime(0);
	ob.p7animDuration = dur;
	if (!ob.p7AnimRunning) {
		ob.p7AnimRunning = true;
		ob.p7IR2anim = setInterval(function(){
			P7_IR2animator(ob, cb);
		}, p7IR2.animDelay);
	}
}

function P7_IR2animator(el, cb, op){
	var i, tB, tA, tS, et, nv, m = false;
	et = P7_IR2getTime(el.p7animStartTime);
	if (et >= el.p7animDuration) {
		et = el.p7animDuration;
		m = true;
	}
	if (el.p7animCurrentVal != el.p7animFinishVal) {
		nv = P7_IR2anim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal - el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal = nv;
		el.style[el.p7animProp] = nv + el.p7animUnit;
	}
	if (m) {
		el.p7AnimRunning = false;
		clearInterval(el.p7IR2anim);
		if (cb && typeof(cb) === "function") {
			cb.call(el);
		}
	}
}

function P7_IR2rsz(bp){
	var j, tD;
	for (j = 0; j < p7IR2.ctl.length; j++) {
		tD = document.getElementById(p7IR2.ctl[j][0]);
		if (tD && tD.ir2Box) {
			P7_IR2resizer(tD);
		}
	}
}

function P7_IR2resizer(tD){
	var bX, th;
	bX = tD.ir2Box;
	if (bX.ir2CurrentSlide) {
		if (bX.p7AnimRunning) {
			bX.p7AnimRunning = false;
			clearInterval(bX.p7IR2anim);
		}
		th = P7_IR2getDim(bX.ir2CurrentSlide, 'height');
		bX.style.height = th + 'px';
	}
}

var p7IR2tch = {
	el: null,
	fCnt: 0,
	startX: 0,
	startY: 0,
	curX: 0,
	curY: 0
};
function P7_IR2tchStart(evt){
	if (evt.touches.length == 1) {
		p7IR2tch.fCnt = evt.touches.length;
		p7IR2tch.startX = evt.touches[0].pageX;
		p7IR2tch.startY = evt.touches[0].pageY;
		if (!p7IR2tch.el) {
			p7IR2tch.el = this;
		}
	} else if (evt.pointerType) {
		p7IR2tch.fCnt = 1;
		p7IR2tch.startX = evt.clientX;
		p7IR2tch.startY = evt.clientY;
		if (!p7IR2tch.el) {
			p7IR2tch.el = this;
		}
	} else {
		P7_IR2tchCancel(evt);
	}
}

function P7_IR2tchMove(evt){
	var x;
	if (p7IR2tch.startX !== 0) {
		if (evt.touches.length == 1) {
			x = Math.abs(evt.touches[0].pageX - p7IR2tch.startX);
			if (x > 4) {
				evt.stopPropagation();
				evt.preventDefault();
				p7IR2tch.curX = evt.touches[0].pageX;
				p7IR2tch.curY = evt.touches[0].pageY;
			} else {
				P7_IR2tchCancel(evt);
			}
			if (x >= 72) {
				P7_IR2tchEnd(evt);
			}
		} else if (evt.pointerType) {
			x = Math.abs(evt.clientX - p7IR2tch.startX);
			if (x > 4 || navigator.maxTouchPoints || navigator.msMaxTouchPoints) {
				evt.stopPropagation();
				evt.preventDefault();
				p7IR2tch.curX = evt.clientX;
				p7IR2tch.curY = evt.clientY;
			} else {
				P7_IR2tchCancel(evt);
			}
			if (x >= 72) {
				P7_IR2tchEnd(evt);
			}
		} else {
			P7_IR2tchCancel(evt);
		}
	} else {
		P7_IR2tchCancel(evt);
	}
}

function P7_IR2tchEnd(evt){
	var swl, swa, swd, x, y, z, r;
	if (p7IR2tch.fCnt == 1 && p7IR2tch.curX !== 0) {
		evt.preventDefault();
		swl = Math.round(Math.sqrt(Math.pow(p7IR2tch.curX - p7IR2tch.startX, 2) + Math.pow(p7IR2tch.curY - p7IR2tch.startY, 2)));
		if (swl >= 72) {
			x = p7IR2tch.startX - p7IR2tch.curX;
			y = p7IR2tch.curY - p7IR2tch.startY;
			r = Math.atan2(y, x);
			swa = Math.round(r * 180 / Math.PI);
			if (swa < 0) {
				swa = 360 - Math.abs(swa);
			}
			if ((swa <= 45) && (swa >= 0)) {
				swd = 'left';
			} else if ((swa <= 360) && (swa >= 315)) {
				swd = 'left';
			} else if ((swa >= 135) && (swa <= 225)) {
				swd = 'right';
			} else if ((swa > 45) && (swa < 135)) {
				swd = 'down';
			} else {
				swd = 'up';
			}
			p7IR2tch.el.onSwiped(swd);
			P7_IR2tchCancel(evt);
		} else {
			P7_IR2tchCancel(evt);
		}
	} else {
		P7_IR2tchCancel(evt);
	}
}

function P7_IR2tchCancel(evt){
	p7IR2tch.fCnt = 0;
	p7IR2tch.startX = 0;
	p7IR2tch.startY = 0;
	p7IR2tch.curX = 0;
	p7IR2tch.curY = 0;
	p7IR2tch.el = null;
}

function P7_IR2bindSwipe(ob, fn){
	if (ob.addEventListener) {
		ob.onSwiped = fn;
		if ('ontouchstart' in window) {
			ob.addEventListener('touchstart', P7_IR2tchStart, false);
			ob.addEventListener('touchend', P7_IR2tchEnd, false);
			ob.addEventListener('touchmove', P7_IR2tchMove, false);
			ob.addEventListener('touchcancel', P7_IR2tchCancel, false);
		} else {
			if (navigator.maxTouchPoints) {
				ob.addEventListener('pointerdown', P7_IR2tchStart, false);
				ob.addEventListener('pointerup', P7_IR2tchEnd, false);
				ob.addEventListener('pointermove', P7_IR2tchMove, false);
			} else if (navigator.msMaxTouchPoints) {
				ob.addEventListener('MSPointerDown', P7_IR2tchStart, false);
				ob.addEventListener('MSPointerUp', P7_IR2tchEnd, false);
				ob.addEventListener('MSPointerMove', P7_IR2tchMove, false);
			}
			P7_IR2setClass(ob, 'p7ir2-pointer');
		}
	}
}

function P7_IR2url(dv){
	var i, h, s, x, k, d = 'ir2', pn, tD, n = dv.replace('p7IR2_', '');
	tD = document.getElementById(dv);
	h = document.location.search;
	if (h) {
		h = h.replace('?', '');
		s = h.split(/[=&]/g);
		if (s && s.length) {
			for (i = 0; i < s.length; i += 2) {
				if (s[i] == d) {
					x = s[i + 1];
					if (n != x.charAt(0)) {
						x = false;
					}
					if (x && x.length > 2) {
						tD.ir2CurrentSlideNum = P7_IR2parsePN(x);
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
			tD.ir2CurrentSlideNum = P7_IR2parsePN(x);
		}
	}
}

function P7_IR2parsePN(d){
	var x = d.lastIndexOf('_');
	return parseInt(d.substr(x + 1), 10);
}

function P7_IR2randomize(){
	return 0.5 - Math.random();
}

function P7_IR2randomizer(ul){
	var i, tI = [], cn, k = 0, rn;
	cn = ul.childNodes;
	for (i = 0; i < cn.length; i++) {
		tI[i] = cn[i];
	}
	tI.sort(P7_IR2randomize);
	while (k < tI.length) {
		ul.appendChild(tI[k]);
		k++;
	}
}

function P7_IR2addSheet(sh){
	var h, hd;
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

function P7_IR2getIEver(){
	var j, v = -1, nv, m = false;
	nv = navigator.userAgent.toLowerCase();
	j = nv.indexOf("msie");
	if (j > -1) {
		v = parseFloat(nv.substring(j + 4, j + 8));
		if (document.documentMode) {
			v = document.documentMode;
		}
	}
	return v;
}

function P7_IR2getCSSPre(){
	var i, dV, pre = ['animationDuration', 'WebkitAnimationDuration'];
	var c = 'none', cssPre = ['', '-webkit-'];
	dV = document.createElement('div');
	for (i = 0; i < pre.length; i++) {
		if (dV.style[pre[i]] !== undefined) {
			c = cssPre[i];
			break;
		}
	}
	p7IR2prf = c;
	return c;
}

function P7_IR2setCC(dd, rp, ac){
	var d, tC;
	d = dd.replace('_', rp);
	tC = document.getElementById(d);
	if (tC) {
		tC.onclick = function(){
			return P7_IR2control(dd, ac);
		};
	}
	return tC;
}

function P7_IR2setClass(ob, cl){
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

function P7_IR2remClass(ob, cl){
	if (ob) {
		var cc, nc;
		cc = ob.className;
		if (cc && cc.indexOf(cl > -1)) {
			nc = cc.replace(cl, '');
			nc = nc.replace(/\s+/g, ' ');
			nc = nc.replace(/\s$/, '');
			nc = nc.replace(/^\s/, '');
			ob.className = nc;
		}
	}
}
