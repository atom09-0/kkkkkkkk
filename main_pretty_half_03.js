
        class Ot extends n.Component {
            render() {
                const e = {
                    loop: !0,
                    autoplay: !0,
                    animationData: Ft,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                    }
                };
                return Object(we.jsx)(rt.a, {
                    options: e,
                    style: {
                        pointerEvents: "none"
                    }
                })
            }
        }
        var Dt = Ot;
        i(1075);
        const Bt = new class {
            constructor() {
                this.targetFPS = 60, this.frameInterval = 1e3 / this.targetFPS, this.isDetecting = !1, this.callbacks = [], this.continuousCheckInterval = null, this.continuousCheckIntervalMs = 5e3
            }
            async detectRefreshRate() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 60;
                return this.isDetecting ? this.targetFPS : (this.isDetecting = !0, new Promise(t => {
                    if (window.screen && window.screen.refreshRate) {
                        const e = window.screen.refreshRate;
                        if (e >= 30 && e <= 240) return this.targetFPS = Math.round(e), this.frameInterval = 1e3 / this.targetFPS, this.isDetecting = !1, this.notifyCallbacks(), void t(this.targetFPS)
                    }
                    let i = performance.now(),
                        n = 0;
                    const z = s => {
                        if (n++, n < e) requestAnimationFrame(z);
                        else {
                            const e = (s - i) / n,
                                z = Math.round(1e3 / e);
                            this.targetFPS = Math.min(z, 120), this.frameInterval = 1e3 / this.targetFPS, this.notifyCallbacks(), this.isDetecting = !1, t(this.targetFPS)
                        }
                    };
                    requestAnimationFrame(z)
                }))
            }
            onRefreshRateChange(e) {
                return this.callbacks.push(e), () => {
                    const t = this.callbacks.indexOf(e);
                    t > -1 && this.callbacks.splice(t, 1)
                }
            }
            notifyCallbacks() {
                this.callbacks.forEach(e => {
                    try {
                        e(this.targetFPS, this.frameInterval)
                    } catch (t) {
                        console.error("\u5237\u65b0\u7387\u56de\u8c03\u6267\u884c\u9519\u8bef:", t)
                    }
                })
            }
            getTargetFPS() {
                return this.targetFPS
            }
            getFrameInterval() {
                return this.frameInterval
            }
            setTargetFPS(e) {
                this.targetFPS = Math.min(e, 120), this.frameInterval = 1e3 / this.targetFPS, console.log(`\ud83d\udd27 \u624b\u52a8\u8bbe\u7f6e\u5237\u65b0\u7387: ${this.targetFPS}fps`), this.notifyCallbacks()
            }
            getPerformanceAdvice() {
                const e = {
                    refreshRate: this.targetFPS,
                    frameInterval: this.frameInterval,
                    performance: "good",
                    recommendations: []
                };
                return this.targetFPS < 45 ? (e.performance = "poor", e.recommendations.push("\u5efa\u8bae\u964d\u4f4e\u7ed8\u5236\u590d\u6742\u5ea6"), e.recommendations.push("\u8003\u8651\u51cf\u5c11\u540c\u65f6\u7ed8\u5236\u7684\u66f2\u7ebf\u6570\u91cf")) : this.targetFPS < 60 ? (e.performance = "fair", e.recommendations.push("\u6027\u80fd\u826f\u597d\uff0c\u53ef\u4ee5\u9002\u5f53\u4f18\u5316")) : (e.performance = "excellent", e.recommendations.push("\u6027\u80fd\u4f18\u79c0\uff0c\u53ef\u4ee5\u542f\u7528\u66f4\u591a\u89c6\u89c9\u6548\u679c")), e
            }
            initVisibilityListener() {
                "undefined" !== typeof document && document.addEventListener("visibilitychange", () => {
                    document.hidden ? this.stopContinuousDetection() : setTimeout(() => {
                        this.detectRefreshRate(30).then(() => {
                            this.continuousCheckIntervalMs && this.startContinuousDetection(this.continuousCheckIntervalMs)
                        })
                    }, 100)
                })
            }
            initResizeListener() {
                if ("undefined" === typeof window) return;
                let e;
                window.addEventListener("resize", () => {
                    clearTimeout(e), e = setTimeout(() => {
                        this.detectRefreshRate(5)
                    }, 500)
                })
            }
            startContinuousDetection() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5e3;
                this.stopContinuousDetection(), this.continuousCheckIntervalMs = e, this.detectRefreshRate(30), this.continuousCheckInterval = setInterval(() => {
                    this.isDetecting || this.detectRefreshRate(30)
                }, e)
            }
            stopContinuousDetection() {
                this.continuousCheckInterval && (clearInterval(this.continuousCheckInterval), this.continuousCheckInterval = null)
            }
            init() {
                this.initVisibilityListener(), this.initResizeListener()
            }
        };
        "undefined" !== typeof window && (Bt.init(), window.addEventListener("load", () => {
            Bt.detectRefreshRate().then(() => {
                Bt.startContinuousDetection(5e3)
            })
        }));
        var St = Bt;
        i(1076);
        const Ct = (e, t) => e.toyData === t.toyData && e.isBloomEnabled === t.isBloomEnabled,
            wt = e => {
                let {
                    toyData: t,
                    maxPointNum: i,
                    isInPc: z,
                    isBloomEnabled: s = !0
                } = e;
                const A = Object(n.useRef)(null),
                    r = Object(n.useRef)(null),
                    o = Object(n.useRef)(new Map),
                    a = Object(n.useRef)(6),
                    [p, c] = Object(n.useState)(!1),
                    [l, d] = Object(n.useState)(null),
                    E = Object(n.useRef)(t),
                    x = Object(n.useRef)({
                        animate: null,
                        frameId: null
                    }),
                    u = [{
                        r: 1,
                        g: .176,
                        b: .537,
                        a: 1
                    }, {
                        r: .047,
                        g: .62,
                        b: .949,
                        a: 1
                    }, {
                        r: .871,
                        g: .118,
                        b: .859,
                        a: 1
                    }];

                function g() {
                    const e = window.devicePixelRatio >= 2 ? 2 : 1;
                    return function() {
                        const e = navigator.userAgent.match(/iPhone|iPad|iPod|Android|HarmonyOS/i),
                            t = "ontouchend" in document || navigator.maxTouchPoints > 0;
                        return !!(e || /Safari/i.test(navigator.userAgent) && t && !/Macintosh/i.test(navigator.userAgent))
                    }() ? e > 1 ? .35 : .3 : e > 1 ? .3 : .32
                }

                function k(e) {
                    let {
                        type: t,
                        version: i
                    } = e;
                    return t.toLowerCase() + i === "gush2"
                }

                function y(e, t) {
                    return `${e}_${t}`
                }

                function m(e, t, i, n) {
                    if (!r.current || !i || i.length < 2) return;
                    const z = y(e, t),
                        s = function(e, t) {
                            const i = u[e] || u[0];
                            if (1 !== e) return i;
                            const n = ((null === t || void 0 === t ? void 0 : t.toyFun) || "").toLowerCase();
                            return n.includes("f") || "p" === n ? u[2] : n.includes("d") || n.includes("pos") || "o" === n && !k(t) ? u[1] : n.includes("t") || k(t) ? u[0] : i
                        }(t, n),
                        A = new window.GLCurveModel({
                            curveId: z,
                            lineWidth: 8,
                            curveColor: s,
                            amplitude: 0,
                            bloomStrength: g()
                        });
                    r.current.addPaintModel(A), o.current.set(z, {
                        curveId: z,
                        model: A
                    })
                }

                function M() {
                    const e = E.current;
                    if (!p || !r.current || !e) return;
                    if (!A.current) return;
                    const t = Object.keys(e).filter(e => e && e.includes("line")).map(e => parseInt(e.slice(-1), 10) - 1).filter(e => Number.isInteger(e) && e >= 0).sort((e, t) => e - t);
                    if (0 === t.length) return;
                    (z ? t : [...t].reverse()).forEach(t => {
                        const n = e[`line${t+1}`];
                        if (n && n.length > 1) {
                            const z = n.length > i ? n.slice(n.length - i) : n,
                                s = y(e.toyId, t);
                            o.current.get(s) || m(e.toyId, t, z, e)
                        }
                    })
                }

                function f() {
                    const e = E.current;
                    if (!r.current || !e) return;
                    const t = Object.keys(e).filter(e => e && e.includes("line")).map(e => parseInt(e.slice(-1), 10) - 1).filter(e => Number.isInteger(e) && e >= 0).sort((e, t) => e - t);
                    (z ? t : [...t].reverse()).forEach(t => {
                        const n = e[`line${t+1}`];
                        if (n && n.length > 1) {
                            const z = function(e) {
                                    if (!e || 0 === e.length) return 0;
                                    const t = e[e.length - 1];
                                    return Math.max(0, Math.min(1, t / 20))
                                }(n.length > i ? n.slice(n.length - i) : n),
                                s = y(e.toyId, t);
                            o.current.has(s) && r.current.updateCurveAmplitude(s, z)
                        }
                    })
                }

                function j() {
                    r.current && (r.current.resize(), r.current.render(-1))
                }
                async function h() {
                    if (A.current && !p) try {
                        if ("undefined" === typeof window.CanvasRenderer && await new Promise((e, t) => {
                                if (window.CanvasRenderer && window.GLCurveModel) return void e();
                                const i = e => new Promise((t, i) => {
                                        const n = document.createElement("script");
                                        n.src = e, n.onload = t, n.onerror = i, document.head.appendChild(n)
                                    }),
                                    n = async () => {
                                        try {
                                            "undefined" === typeof window.process && (window.process = {
                                                env: {}
                                            });
                                            const t = function() {
                                                let e = "/";
                                                return e = "/v2/", e
                                            }();
                                            await i(`${t}pattern/CanvasRenderer/index.js`), await new Promise(e => {
                                                window.CanvasRenderer && window.GLCurveModel ? e() : window.addEventListener("PatternModulesLoaded", e, {
                                                    once: !0
                                                })
                                            }), e()
                                        } catch (l) {
                                            t(l)
                                        }
                                    };
                                n()
                            }), "function" !== typeof window.CanvasRenderer) throw new Error("CanvasRenderer is not a function, got: " + typeof window.CanvasRenderer);
                        const e = new window.CanvasRenderer(A.current, a.current, !1);
                        r.current = e, r.current.glowEnabled = s, c(!0)
                    } catch (e) {
                        d(e.message || e.toString())
                    }
                }
                return Object(n.useEffect)(() => {
                    var e, t, i;
                    h(), j();
                    const n = null !== (e = null === St || void 0 === St || null === (t = St.getTargetFPS) || void 0 === t ? void 0 : t.call(St)) && void 0 !== e ? e : 60;
                    a.current = Math.max(6, Math.min(120, Math.round(n / 10)));
                    const z = null === St || void 0 === St || null === (i = St.onRefreshRateChange) || void 0 === i ? void 0 : i.call(St, (e, t) => {
                        r.current && (a.current = Math.max(6, Math.min(120, Math.round(e / 10))))
                    });
                    return window.addEventListener("resize", j), () => {
                        window.removeEventListener("resize", j), z && z()
                    }
                }, []), Object(n.useEffect)(() => {
                    if (!A.current || !p) return;
                    const e = A.current,
                        t = {
                            current: !1
                        },
                        i = new ResizeObserver(e => {
                            for (const i of e) {
                                const {
                                    width: e,
                                    height: n
                                } = i.contentRect;
                                if (t.current && e > 0 && n > 0 && (M(), j(), x.current.animate)) {
                                    const e = x.current.frameId;
                                    e && cancelAnimationFrame(e), x.current.frameId = requestAnimationFrame(x.current.animate)
                                }
                                t.current = 0 === e || 0 === n
                            }
                        });
                    return i.observe(e), () => {
                        i.disconnect()
                    }
                }, [p]), Object(n.useEffect)(() => {
                    if (r.current) {
                        r.current.setGlowEnabled(!!s);
                        try {
                            r.current.render(-1)
                        } catch (e) {}
                    }
                }, [s]), Object(n.useEffect)(() => {
                    const e = () => {
                            if (x.current.frameId && (cancelAnimationFrame(x.current.frameId), x.current.frameId = null), x.current.animate = null, r.current) {
                                try {
                                    r.current.dispose()
                                } catch (e) {}
                                r.current = null
                            }
                            o.current.clear()
                        },
                        t = () => {
                            e()
                        },
                        i = () => {
                            e()
                        },
                        n = t => {
                            t.persisted || e()
                        };
                    return window.addEventListener("beforeunload", t), window.addEventListener("unload", i), window.addEventListener("pagehide", n), () => {
                        e(), window.removeEventListener("beforeunload", t), window.removeEventListener("unload", i), window.removeEventListener("pagehide", n)
                    }
                }, []), Object(n.useEffect)(() => {
                    E.current = t, p && r.current && t && M()
                }, [t, p]), Object(n.useEffect)(() => {
                    if (!p) return;
                    let e = null,
                        t = 0;
                    var i = a.current;
                    const n = () => {
                        if (!r.current) return;
                        const z = t % i;
                        0 === z && (M(), i = a.current, r.current.stepDivisor = i, f(), t = 0), r.current.render(z), t++, e = requestAnimationFrame(n), x.current.frameId = e
                    };
                    return x.current.animate = n, e = requestAnimationFrame(n), x.current.frameId = e, () => {
                        x.current.frameId && (cancelAnimationFrame(x.current.frameId), x.current.frameId = null), e && cancelAnimationFrame(e), x.current.animate = null
                    }
                }, [p]), l ? Object(we.jsx)("div", {
                    className: "webgl-error",
                    children: Object(we.jsxs)("p", {
                        children: ["WebGL\u521d\u59cb\u5316\u5931\u8d25: ", l]
                    })
                }) : Object(we.jsx)("div", {
                    style: {
                        position: "relative",
                        width: "100%",
                        height: "100%"
                    },
                    children: Object(we.jsx)("canvas", {
                        ref: A,
                        className: "webgl-curve-canvas",
                        style: {
                            width: "100%",
                            height: "100%",
                            display: "block"
                        }
                    })
                })
            };
        var Lt = z.a.memo(wt, Ct);
        const Vt = (document.documentElement.clientWidth > 540 ? 540 : document.documentElement.clientWidth) / 5;
        let It = (new Date).getTime();
        var Qt = e => {
                const t = Se(e => e.linkId),
                    i = Se(e => e.isInPc),
                    z = Se(e => e.linkStatus),
                    s = Se(e => e.chatMode),
                    A = Se(e => e.controlState),
                    r = Se(e => e.update_orderLine),
                    o = Se(e => e.currentBallId),
                    a = Se(e => e.isTouchingBall),
                    p = Se(e => e.toys),
                    c = e.orgyToys || [],
                    l = Se(e => e.orderLine),
                    {
                        t: d
                    } = Object(Ce.a)(),
                    E = Object(n.useRef)(0),
                    [x, u] = Object(n.useState)(i ? 60 : Vt);
                Object(n.useEffect)(() => {
                    if (!o) return;
                    const e = ".line-item-" + o.split("-")[0],
                        t = document.querySelector(e);
                    if (!t) return;
                    const i = t.parentElement,
                        n = i.children;
                    [].indexOf.call(n, t) === n.length - 1 ? i.scrollTo({
                        top: i.scrollHeight,
                        behavior: "smooth"
                    }) : t.scrollIntoView()
                }, [o]), Object(n.useEffect)(() => {
                    if (l && l.length && t) {
                        let e = (new Date).getTime();
                        e - It > 100 && (It = e, function() {
                            const e = ((e, t, i) => {
                                const n = {
                                        ...e
                                    },
                                    z = {};
                                Object.keys(n).forEach(function(e) {
                                    const t = n[e],
                                        i = t.toyId;
                                    z[i] = {
                                        v: -1,
                                        v1: -1,
                                        v2: -1,
                                        v3: -1,
                                        s: -1,
                                        p: -1,
                                        r: -1,
                                        f: -1,
                                        t: -1,
                                        d: -1,
                                        o: -1,
                                        pos: -1
                                    }, (t.toyFunArr || t.toyFun.split(",")).forEach(e => {
                                        let n = -1,
                                            s = [];
                                        switch (e) {
                                            case "v":
                                            case "v1":
                                            case "s":
                                            default:
                                                s = t.line1;
                                                break;
                                            case "v2":
                                            case "r":
                                            case "p":
                                            case "f":
                                            case "d":
                                            case "pos":
                                            case "o":
                                                s = t.line2;
                                                break;
                                            case "t":
                                                s = "solace" === t.type.toLowerCase() ? t.line1 : t.line2;
                                                break;
                                            case "v3":
                                                s = t.line3
                                        }
                                        s && s.length > 1 && (n = s[s.length - 1]), "p" === e && (n >= 1 && n <= 6 ? n = 1 : n > 6 && n < 14 ? n = 2 : n >= 14 && (n = 3)), "pos" === e && n > 0 && (n *= 5), z[i] = {
                                            ...z[i],
                                            [e]: n
                                        }
                                    })
                                });
                                const s = {
                                        version: 5,
                                        cate: "id",
                                        id: z
                                    },
                                    A = {
                                        linkId: t,
                                        toyCommandJson: JSON.stringify(s),
                                        userTouch: !1
                                    };
                                return i === M && (A.groupSessionId = t, A.toyCommand = JSON.stringify(s), delete A.linkId, delete A.toyCommandJson), A
                            })(l, t, s);
                            if ((e => {
                                    if (!e) return !0;
                                    let t = null;
                                    try {
                                        t = JSON.parse(e).id
                                    } catch (i) {
                                        return !0
                                    }
                                    return !t || Object.values(t).every(e => Object.values(e).every(e => -1 === e))
                                })(s === M ? null === e || void 0 === e ? void 0 : e.toyCommand : null === e || void 0 === e ? void 0 : e.toyCommandJson)) return;
                            const i = Date.now();
                            e.userTouch = a, (a && i - E.current >= 100 || i - E.current > 1e3) && (E.current = i, Mt.instance.emit(s === M ? "gcls_group_control_toy_command_ts" : "anon_command_link_ts", e))
                        }())
                    }
                }, [l, x]), Object(n.useEffect)(() => {
                    const e = setInterval(() => {
                        z !== f && clearInterval(e), A === b && r(N)
                    }, 100);
                    return function() {
                        clearInterval(e)
                    }
                }, [A, z]);
                let g = c.length > 0,
                    k = g ? c : p,
                    y = [];
                if (k && k.length > 0) {
                    i && k.length;
                    for (let t = 0; t < k.length; t++) {
                        let n = k[t];
                        let z = (S[(n.type + "").toLowerCase()] || n.type) + " " + (n.version && "1" != n.version ? n.version : ""),
                            s = "";
                        (n.status + "" === "false" || n.connectStatus && "connect" !== n.connectStatus || n.groupLinkToyStatus + "" === "false") && (s = Object(we.jsxs)("span", {
                            style: {
                                color: "#FF3E3E"
                            },
                            children: [" (", d("toy_reconnecting"), ")"]
                        })), g && (z = Object(we.jsx)("span", {
                            style: {
                                paddingLeft: "10px"
                            },
                            children: "Orgy Control"
                        }), s = "");
                        let A = Object(we.jsxs)("div", {
                            className: `line-item ${k.length<2&&i?"line-item-half":""} line-item-${n.id}`,
                            children: [Object(we.jsxs)("div", {
                                className: "toy-name",
                                children: [z, s]
                            }), (() => {
                                const z = Array.isArray(l) ? l.find(e => e && e.toyId === n.id) : null;
                                return z ? Object(we.jsx)(Lt, {
                                    toyData: z,
                                    maxPointNum: x,
                                    isInPc: i,
                                    isBloomEnabled: e.isBloomEnabled
                                }, `webgl-${t}-${n.id}`) : null
                            })()]
                        }, `line-area-${t+1}`);
                        y.push(A)
                    }
                }
                return Object(we.jsx)(we.Fragment, {
                    children: Object(we.jsx)("div", {
                        className: "order-lines",
                        children: y
                    })
                })
            },
            Pt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAnCAYAAABdRFVFAAAAAXNSR0IArs4c6QAAAolJREFUaEPtmP1xFDEMxfU6oATogHQAFUAqIKkAUgFJBYQKSCrgOgAqICVQQjp42XfYxLeRP3aXyR830szNXe5srfXzk2wFFlYlgGBTJxBwGuoIOAFnXfEI5YRyQjnrCIRy1nE7uppD8gWA+3U4DmdtgkPyjZl9NjO9/zGzGwBXSxamYJKPMzPT5zszOwUgf0Pm+NDccwA/hxxUBq2Gk8D8cPwK0Pnookj+NrPXs/Ha+bcABKprJL9PUN87A88A3HYd/E84JF+amYLSTssURBngECCS3ybFSTEyAdFLvvPfXUAkpdzLig99vRrQYuUkMFJMDmIH4JSkglSw2ZqAZkFpzklKTfnOoJsKcnwoHXfTGm/M7EOxlsul6a65i+Ck3JZiMhjl9kkugKOAnKBUHxSQpWd0AZFU8Ps5ya4AZAXJz7WZfdwCaCmcMrcFRrI/KJw9QA6Yg6BGAJGUsrRJLpj8JUnBUtplW6SgYTgkv0w14VOR21KMe6LUAPV2uwjCU9B+M9KYMq2/TsrN6ypd7D9vATQEx9ltKaZ5TDqAVD9yAde6nyhmHpmTYhpS+rkDoFrVtLWAunCcIC8AKJ+7luZKcSUUzbudVJdPqV5gmlvWoDzeTeuaMwfQNYCL1sNH4GhhuuQN7baz+6oPOsX0rl1XGvwrnF3Cj0VaG/Iujd8l5Q1fFCsp9qp12RyBo3xWUVsc1Ejgzz0mqVnx/OqptwvnuRe/9XnRW80IRm/VkFT0VhU40VtVuvPorf4e/0+6895tO3qrx1Rzb9trb8bZ7fBRHr3VWNHTqOit0pV7/k+s6K2yiEhGb9XoZqO32trTHOP84dPqGIPvxRRwGoQCTsDpJZD/eyinwe0BSpv8N6ocum0AAAAASUVORK5CYII=";
        i(1077);
        const Gt = Object(n.forwardRef)((e, t) => {
            let {
                linkId: i,
                toyId: z,
                ballId: s,
                orderType: A,
                ballCount: r,
                ballIndex: o,
                ballRadius: a,
                zIndex: p,
                setZIndex: c,
                toyName: l,
                ballListBoxPos: d
            } = e.data;
            const E = Se(e => e.isInPc),
                x = Se(e => e.orderLine),
                u = Se(e => e.chatMode),
                k = Se(e => e.controlState),
                y = Se(e => e.update_controlState),
                M = Se(e => e.currentBallId),
                f = Se(e => e.update_currentBallId),
                j = Se(e => e.update_isTouchingBall),
                h = Se(e => e.isEnd),
                T = 2 * a,
                N = Object(n.useRef)(0),
                U = Object(n.useRef)(null),
                [F, O] = Object(n.useState)({}),
                D = document.querySelector(".page").offsetWidth / 10,
                [B, S] = Object(n.useState)({}),
                [C, w] = Object(n.useState)(!1),
                [L, V] = Object(n.useState)(""),
                I = Se(e => e.update_orderLine),
                Q = Object(n.useCallback)(e => {
                    const t = W(e, 0, N.current);
                    I(R, {
                        toyId: z,
                        orderType: A,
                        level: t
                    }, "slideBtn")
                }, [z, A, I, W]),
                P = Object(n.useMemo)(() => Object(H.throttle)(Q, 100), [Q]),
                {
                    logoImg: G,
                    ballImgClass: X
                } = Object(n.useMemo)(() => function() {
                    let e = arguments.length > 1 ? arguments[1] : void 0,
                        t = "ball-img-pink",
                        i = Pt;
                    switch (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "v") {
                        case "v1":
                        case "v":
                        default:
                            i = Pt, t = "ball-img-pink";
                            break;
                        case "s":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAABICAYAAAA3bl1oAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANmSURBVHgB7d2PcZswFAbw5y7QdIKyQTsCGyQjeINmg3iDdIO0E7SdgGzgdgLcCZxO8FUc+Bw5PBCYf098vztf7nQBg/mQwJKRyMoBSNwrr16J0Lq5EGQ4y4TWywXgC966F1qfqqmoc2TTsULVNYNmL7Qe7oA/oN1OKH4NTUWdVChe7gDftDQVl4r/vRGKkzu4j+juUSg+RfWP/lKheOD8bWRfOdh0xMMdzCdc70nIPncgtxjOnZBduL6puMRvMS1zB+8HhscOMItQ33E1lGg7wDYSKXfQcvcnkXG8bDabDxKhdxKvXzKe7xKpaGuIEEXdX1fuzv7Vfi4x1xDUAwNBHgaCPAwEeRgI8jAQ5GEgyMNAkIeBIA8DQR4GgjzmA4FyEExWdUvnU3ZNV13sx9M4CXDwzPxQPyIqaKibNtghcNm6oXm50HygD63/Gbj8NYHIlMU/i2GxXkO8l/mYHq5vPRAHpXyKg6K9x4sYFmsNwUD0xNvO4ZkOhPmhYtpFYMgwuLmWXTLWEORhIMjDQJCHgSBPrIE4yPgOEiHTgcACO5OWuE1dWK8hovxyaE4MRH8HpTwRw2INxD8Z31+lPBHDrAdC62o+yPi0Woi9nTNKlPI5m4xPYpj1QHxUyn/L+LTQcYDMjOZsMp6V8kRoesVQNWUI27HDOnoPoauWP8Y2jM5yDZEq5VM0F23vlYpRlgNxq5T/kelo73UrNB00z3mRdljPtU2GNuq7aEr4bOypQH9ccaffRVwbiGod2nWEyWdZWm0yHpTyZ5me9ohCNhtTcGfeHXRpx3XVnd3BdynVOtKhtod6gP4w884/o3PL7GrW81U6csvslW3ic7HHhObnV2+lhyIAKGuK4rWTHtxy9w3bxYlhx4DyzuI4VO0w8LY1Te7GKRWGhvZ5L7YyMzRP1JKDt6HDqM6+fcOHvZh2GvovwlHtQyLUX0DNsKjqGM3N2qmmSIS6g/90Fs1WFgbtc3wV+8QLzRAom4d7hM2TtZOFQv3t7KW8Cg+vLeqgnKC9rUZYfBhOAkOBap85e/Br6DYF806M6BAKU/s1OoTVDMX/bMUYlE1g0P4JlQI+sAyGr85R3n20TRnJQJxAr1ozRNRBhPIiMlf2tXMfSrRQ3l18w7lPIaogXELZQ/p6f4v+lEXcbfwHK9ero53aOeoAAAAASUVORK5CYII=", t = "ball-img-pink";
                            break;
                        case "v2":
                            i = Pt, t = "ball-img-blue";
                            break;
                        case "v3":
                            i = Pt, t = "ball-img-purple";
                            break;
                        case "r":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAwCAYAAACVMr0DAAAAAXNSR0IArs4c6QAABENJREFUeF7tm41x1DAQRncrACqAVACpAFIBUAFJBSQVkFRAUgFJBUAFhApIKiBUAB0s94I0IzT2eWVbvjvHmrm5zEWnn6dPu6uVT2UpVQlo1daXxmUBXFkEC+AFcGUClZtfFDwHwGb2WETehLncicgfEblTVd5nXaor2Myeicg3EeE9LwC+icBF5FZVL+dEfArAxyLysQDaW1X9UlB/q6tWBRxMw6fEPHhgnKnqqafikDpmxsKzg65VFbNVpVQBbGavROTDavC8lxQmvF9zwgzGzNhRAI6FHXOhqtclg/XUHRWwmR2KyHsReeHpPKuDijAP2OSqxcx+tvgExsAOGs0PjAI4KBZT0OTIPLBQ0NFUUUUwD+v8wmigBwEOEQJg20wBA70SkectdhiTANjJnVoYO6EjO65NGCgZRfe20b0BmxmDAy4xbl6wZQzs3qYFhROqxQLYi9V3z6dS7bpt1OEzgHvSVwS9AJsZDqzJ0/8HNp3UKqI4D0r+vi1gc+hB1Z9bfMipqp557F1apxhwC1wUiWKBuPMlOGtElJuOYshFgEPHmIW04PXx/r3t1DauyBo1H6oqfsVV3IBbjrx0dLwNdtQ12x6VVvPG0b3L/Ic7Vi8BjHKJc2O5UdX9HmPeua+YGQ46jZQuVfXIMxEX4KBegvNYMAcHczMLbcDC/H9kEdMTz871As4TNsSuo512PErYdB0zI2rC8cVC6Nbp1L2ACV1iPpcO9h6KeiPNkLj6nQD+ujrWp0waNeAFzPaI+QUS5XubVtQm+s9yGC4f5AWcJkcWwP9Wd1TAqYngUIGJmP11T75LVocsSz4jj3zQtZO8CsaYkxSJhQhi9Nxp12A3+f+GQxb54zSnPMgGEwOmyZoHZyYacsgukbkUzNI0BNtkwk42qaqp+m7Iv7gFVgI4VzHzK05+TAVlrH5aklsclV03L27AQcW5LZ415Ba4RZeyRYAD5Dz5wcc4PE53s8iorbmpuVrNMc3HdG6UYsBrIO+8msNpjWiJ6CC/qSmGC5BegAPk/GweV/P+wrD28wad0imo0AGWllwhWVOXvQEHyGyXpsw//+YgwmUmK7+VMXO4i3sd0rBNd4vMgcuE3uMfBDhA5loFNadJ6XwxUTWwSZD0HmyBKFurJlBJ1Kx7zIBLWaKkQSfWwYDjTIJj6AIdlU2Iw+UnsDnTD5pEG82w9QkvAYlSSVg1KTVtYvBVfdrYaIAbQL8seBAlPmWJ0n/xaGt4xQVZtwDAAxov/n4aQMbPPcKPjxFwUzFqJDQ64HQ24dkJTAcq6lKOB8SYdeKi4pCr7aKqgDPYQMbuoew+z66NATeaJvxBNahVTYSHQrCNQOYFcNTtsY+e5qNZYasD9Da8TwI0H+BkCvaQCeCj7UxtK19nER4l7WCrUxt9/7OEbftpwlYB9izCrtVZAFdesQXwArgygcrNLwpeAFcmULn5v6S9j0Cnf2qCAAAAAElFTkSuQmCC", t = "ball-img-blue";
                            break;
                        case "p":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAABICAYAAAA3bl1oAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHdSURBVHgB7drhUcJAEIbhL1ZgCdgBdmAJ2oEdiBWIFagVoBVoB5QAHYQOsIN1b5IZ0SGSC0c8yPvMLOFPkp2dneVyQQIAAAAAAAAAAAAAAAAAAAAAAAAAAJDMbOax9njQkfBc7+qcZ0Ja9lPpMVKmPLexx3wzYSEt2y67aRFy2paokJY1K3OYFp7DVZ2L0RA9sN2ePM7Vs3DP+t5/EtKydkqPa/XEdkwFGuKALM7MDvgzYi2nAg1xQBav9LhVYn7Na6seJaMIaVl3M0swLcI1PN6tIx2JwnMd+zFsnIx1ulYej0VRvKoDr9GdH6YevS9ae7TyuAkNUfqXkYbh2ZviPuYEr8+THyYahmVoiLVOu/M3rbwhLmJOGFh9dObxpmFYedwo3mV97hC8FOHTqtX4SHnbZ5v6xWPq0+FTHXmNpnvm8Ki8Lb0+HzoW1s2iXjSnyiE8aZTWgZCWxQn7BFMdSLi2RRLSiqj93Hp42WXVtFi0TUpIq0XNw1To/fEw3NNa7FwKae2o99z+8RW4VdPilYbokTVPhVtlIuRiDYtOIa0tNQ7vFbLbMGqaFkJa9v07XXpcKXO/pkUppGXVH1cnOU6FJvW0mBxDAwMAAAAAAAAAAAAAAAAAAAAA2vgClgIruVv2jq0AAAAASUVORK5CYII=", t = "ball-img-purple", e.indexOf("Max") > -1 && (t = "ball-img-blue");
                            break;
                        case "f":
                            i = "data:image/png;base64,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", t = "ball-img-purple";
                            break;
                        case "t":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAnCAYAAABdRFVFAAAAAXNSR0IArs4c6QAAA/NJREFUaEPtmvFVFEEMhzMdSAdSgVKBUoFSgVKBWoFSgVCBUIFYgVqBdiBWIB3E++5leHG43c3szt74B3mPB97t7Wa+SX5JxkvyYIME0gObYQIPcEaiowscVX0kIk/t54mI8O/H9ht3b93PjYh8F5GblNLPfUb63uAYkNci8sKgAKTWAPVNRK5SSvxe1VaHo6rPReSViLx0kdFiUYA6A1ZKib+b22pwVJU0+bRxHjilkTakyBfSxf4Wv0j7fE417vHMIq68F58/Silxz6a2ChxVfb/RjLdFpOA8qXABjDmLMWCAelOAOl4jzZrCMec/F44DBSDnc4AMhYKlKxqGUH+YChk0r/b5zeCYs4DxQnspIu9qnZpaaO375tttbbVrAkdVEVxAZCNaTtYI9RlgSMGDSHSV914MZwcYhBYwq1SQGjimfWkOGJ6zCI6qUp5JpWxXCPF/kEakNpWSCnhSA9RfOxuOie8PpzE0ZghkV3NFAUCLSvwSOL+s5QcGpfmoKxURUVVGkhzJlPdFqT0Ljqp+tD4GHjiw2JGlYE37zu0+RMwWjEXSV3sdLQzPZ9Vw7GFETbZVGrAaWCa8udcBwHX+vKqS6lv9qY3wOXDYhTwSXGzEl064mxVRfFZWJht40UZGEYy+K0fYqN9VcKyZyiHaNZ1s0ehL3qh7YFz0+KpKD3YYqai1cHzUnKaUfOO3t+hxOpKj4XqqZKtqte9hOIXWMM8c7o2Ge5CrSBlMaCovop5jjuMp/2vgkKe04thlSul06uat33cVKc9vVamtqn9cX0ZqjZb6Gji+r6FUhktiC0hFReKWaAeVMuyHqlLROE7BBjUq+xuC0zulioqUfa/WvNrUisLxvULzlLLKQ0XJh+2/7WCMqEBI6Xy9Te76ULQWqcW0PniCGIXj9eafJmtpymycRccI910H7jhevr6ot1JVyj8bgY3KQxSOL4PN9GaHjkyxXjzDbaLUb/Roakbh3IkxhyNTK4i8X7T1W4G0VKKCkEYIp0+nqso0klZeIkbTM7TQzQ6rPYyjxoPI4qeu2ZRlX/127mCxy7N1xvtSnEGN6mctnCbNX1E1Bh00oQYiutNkY6LPBmgtnMU5z0OLfmN0qt+0EYwonFFjk41bIGJJVQZRrEnkIGI4SGiHJtoxJ3vCsc3JAyvpfHe8Ufocipyp3ah9vxDj0SMEVWWXt8LcqhhE/e0FBw1hzsEGB8cCYmhYjC48cl0XOC60czN2779zrKpwgpebwOpxIQJg7JqecDhyoLnMRw/4mb9Wwmv+9UVd8VxI3eBY9OwCVK6lC5hwKZ9LPvo50xaqYT7yzF9RoTqu/iWlIT+7Rk4UXq/r/gKwdtI3ZVvNBgAAAABJRU5ErkJggg==", t = "ball-img-pink";
                            break;
                        case "d":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAnCAYAAABdRFVFAAAAAXNSR0IArs4c6QAAAw1JREFUaEPtmoFR3DAQRfd3EDqAChIqCFSQpAOogFBBKAEqCB0EKgipIKQCSAWhg43/jZbZCNmWfZJ9DtYMA8f5ZPn579fu+iDraCWAlU07gRVOhzpmhaOqb7g2AE+pNarqPoDHudQ9N5wHEdkXkXMAlx6Cqn4TkY8icgngfA5As8GhKkSEcDiuAZxGcNS9fvH+FLCWAicJsDagJcGZHNAS4NCQadwb806FYC0FLQHOHQ1bRL5PDWgRcAAcq+q7CNBB7W1+MXAYOgHQVxF5IrBa4WTzLgpObRjx/CucXSwfBiSBd1OEUIrRqpxdUE4wUxrpppBclRPuiqqeiMhmlxGRYwD3rw6Oqn4Rkd8ArqMi0uDw3xtA4XdO4ZnlOQH2WTP3DwA3JXa2Yp6jqmwvsM3A8SleoKpeNNFEeAaIVbgd31WV58Jhy4NwGLp7uwbHq+M0Vk/wGQ/Ir78EHJYXR5wUQJGbXmSScOFeOS+aV0YiUpD9+7+H45tXV03r83ObtBOASsD5EwrTewCHuxZWbClwgRy9PhEBSsGxi82Zy9+Y22Y3pIq3HsXCKoTWc9yLyF5b4zwKsbehh/xPI11Vqbz3zTxUIdsWrcOlCjymNaSH0ioNxxtusUX2XZRrxvPQQ+ZRfZ/Jeb80HPZcfuaGVs4C+46JkslHAAd9n8l9vyicRGgxG+4MidyFdpg7M2+mERzJFGLsOWrAYa5B7+Ggj1DmyYd2YxftPMvnVkVVw3MUhxPUYw/k+LJ3txkDKYQTbwJ3quKqqQmH2zq9xxZe9KFcAkxnXjUGfjU4QT1xQ5w7CGuurZ59qyrDlsq0RzWcl95WPHSrhJXzhBgQwbBi550edDFBLSxczXx5mmpgqirHAWJoeW8wo+Yudhs8qfVbFuHLBB+sqHQhctX8fTEU8pAQq6ocv5CWgtMOIRyfuBGof8rpp6L6mGAW6dl0wZoMTvAhXjSzaJYFZta5N9OURnMfFJK5J4iPmxROpCQaK39YW5lSDBjVYWr6JSI32xr5GECzwRmz2Kk/s8LpIP4X6QC3N8rVReUAAAAASUVORK5CYII=", t = "ball-img-blue";
                            break;
                        case "pos":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAABOCAYAAAD2FS68AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ5SURBVHgB7d2PcdMwFAbwV44BMoI3oBuQEdgAb0A3aDoBZYKUCdINHCZomCBhgpYJPiSkNIFYtvz8T3a/350ud04IvvOLrOcnqSJUCsCtaRvT1qZlQlTHBMpX/OvZtGshCrG9C8qthV69E/pf1vD4m8TAIRUGDqkwcEiFgUMqDBxSYeCQCgOHVBg4pMLAIZX3Qn/5WpRty8BHrs1nVuZ1Z9vV1dVB6O0xQbAw7ca0whcxm9r7yvlSaP7shTbtQRksVUGUC80PXNV7g37tGUAzYi7mF3Tbw8QEUCY0TXC9TIFx2EC9kZm6kpnyv/hC4ufRvJi2Ne2XuMzpxTdr4b/HZl0f/GuslcnA7oTSZ4LmGnG3JvuZezTMjOB6shzulhSDswdT5y9qXdDY91emLaSlBgHE4EmVD5q6i1igh4Er3DOhuoC9FUpPRNCspEeRgftJKB1w66Cq5DIAHzxPFedhe6VMaHwIL2kZNGjOzmdREzyF0PhqLtJKRoD629ZSaDxwWU3IqJkM3GMB9jopQvjJ8B4JjCXg0n72Oimp+UXnkgC48c4ze52EwE2PKO1tJCE1vU7rh5DUEMKDz1wSUtPrTLIQOtk5x3BTPbPA21tJiCly2mLp98DbS5mgKU9WD1Wot4nOB34MHP8oEzTHwPkhLcFNL934W6F9RrRG+wxtFzi+AJ8kDwfhNLxVLcgHSZk9Wu7KhfCDStavtOBqTV1M71RfXFQ/TDwGjzoLQjgLbOIJ3FbOweWee220ubD7iO9XZ0Fwk8a68IyR0/hUxji5dMRnMI35C5FFfPSD6KnOrYQ911xGxCXAJ7G/4N9CyQTON+mItgv3KXxMj7ATva5uL/Y8H4Ve7/9dDI4zUYKb/lmlVSnD/PtHtFeAg2M99JTaIjyAbb1JdsU5L4WGgXBqey8twaXlBU4PALtaERHCQudQEL6tJDlVAe5pdJmkKvmxppxVbQPHl4n+gvPA8Z8yQZMNHJMFHZfplklxqkKomMnsaGioHsgm0+ugupSRCQ2rYtxgrSQRCJcy2NuMBeEqeRK9DqoXCi6FxlHT62xkRKheKDjJbGpWUL150igL/VG/II9zcMZW0+tYn2VAcJPTdxXnwy1PUoH6uS6DpOgRQbMHM6m0oHoNudXrbQtx25zkQmnBuBsrxexsuhJKE+L3/1t3EUBw46si4v9rXXylnjUInmMALRt+//l2/jEeZGa4Xe2JrXvZ+pddl3Xw7SgTN3vvuFVtk3k5d6authKaDnCDbGoD1btF9KEAU+55gOt9HtAv28vkQvPTUwDZ50d2sMwpoHOH07b6BXT2UGznPxezzaqa8gFgsyU7U6+sAHkQt/7Lvm61K0ZpphAumHK/vjNcAkwqDBxSYeCQCgOHVBg4pMLAIRUGDqkwcEiFgUMqDJxLh4bHiRxcVs/5dzQpzlnlfA3uuXfhD8SYs29/fhk8AAAAAElFTkSuQmCC", t = "ball-img-blue";
                            break;
                        case "o":
                            i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMESURBVHgB1ZmBddsgEIZPmUAbVJ2g3iDpBPEGdjZwJ7C6QTdwNqg7gZQJYk8gdQJ7g79Q8AtGhwQIyc733sXBgeOAX3AoGSUAQC4+lsIWwr7oz1zbhVbbUdhBWJ1lWUu3QgYtbCusQjzvwtbCCpoLI/AT0rKbfCATBW6zDYkp86mkZ+Y3KW27eCOtbf15Fho/6/byWSi0SR9Pwh57fLXCvid5RkTnq55Zl9+XOsBQvwWU/pse30saA5RkXM43lIiBgQRJyif4XzEz7tGfXJHXJIOQS+dwlGzWe/reOPpe+Too0NW8LD/RTIi+Fo4YCp/GDTP6Bc2MnDAmjvehRlvcQDY98XByKl2VC6byjiKAOq2lDJZ6JqVFPfhQm4YtpZyraO8ADQKOdj0BW7i3w/8S0AGF+M3RfR5KrnObdUAHrwhn5zsQdKV0vQpQB4lJ4+n4CeNyowaeuxv6VgFqaU3WHg5XA8EdhO2F1fr3Pgb3eKiUxaS6/IGTT+HhsGHayYmQy50z9aXUXCnDyaO/nGmXc/KpyQMMPVj9be3Z9JVsZbVbP1A3Ra7Jjx+k0l6ZMr+I1Lf0bEe67ovR/qdn06NVXnCjGpfCTgi6OdpersBXq15L98vBKn8jcA/GncI8yKdM/jQrCX16XTNvhR2vlNDZKLc0Aly/amnMmdLfyS22oHFcx4uPvVl2sqYIoM6SCv7sYgeSIl7b4QZx6UTSe3Vs8FuMJ+7SniB41921hqV1qLuBK43A7CsB9715MBDwkvO776YC3fxfBuB9bwZ/aa9oDsBnr8ESAC/B6Q9RpmOvTNLhq7J8lRTIA4XzbJV9M0mOP1b5kaaG0W70OyNGjsGrGZz3yF6uHIzMncb6i5HQXREzgL9mASP2b0Z+ZwokZgC2Tsfc4OwBHCmQmAG8WeVnisfOg/Y0NeBfb6Q6yAqaA+YASpFKRL1IjgKfPZkzAuFooFLnhVG30PUrR5vbXGzQfcMWQ0m3BJ/5SnkB/f8i5ZC3toLuDXxovcb1qrT6Oym5pDn/P1hJj9Rs18vzAAAAAElFTkSuQmCC", t = "Gush 2" === e ? "w40  ball-img-pink" : "w40 ball-img-blue"
                    }
                    return {
                        logoImg: i,
                        ballImgClass: t
                    }
                }(A, l), [A, l]);
            Object(n.useEffect)(() => {
                ! function(e) {
                    let t = "";
                    s === e && (["v", "v1", "s", "t"].includes(A) || "Gush 2" === l ? t = "ball-shadow-pink" : ["f", "v3", "p"].includes(A) ? (t = "ball-shadow-purple", l.indexOf("Max") > -1 && (t = "ball-shadow-blue")) : t = "ball-shadow-blue"), V(t)
                }(M)
            }, [M]);
            const q = Object(n.useRef)({}),
                Y = Object(n.useRef)({
                    x: 0,
                    y: 0
                });
            Object(n.useImperativeHandle)(t, () => ({
                getBallTranslate: () => Y.current,
                setBallTranslate: e => {
                    Y.current = {
                        ...Y.current,
                        ...e
                    }
                },
                get ballTranslate() {
                    return Y.current
                },
                ballId: s,
                toyId: z,
                orderType: A,
                level: W(-Y.current.y, 0, N.current)
            }), [s, z, A]), Object(n.useEffect)(() => {
                U.current && O(U.current.getBoundingClientRect())
            }, []);
            const [, J] = Object(n.useState)(0), K = () => {
                J(e => e + 1)
            };
            Object(n.useEffect)(() => {
                h && w(!1)
            }, [h]), Object(n.useEffect)(() => {
                let e;
                return e = E ? d.height - T : Math.ceil(4.9 * D - T), N.current = e, w(!0),
                    function() {
                        w(!1)
                    }
            }, [d, E]), Object(n.useEffect)(() => {
                if (C) {
                    let e = null;
                    return e = setTimeout(() => {
                            Q(-Y.current.y)
                        }, 100),
                        function() {
                            clearTimeout(e)
                        }
                }
            }, [x, Q, C]), Object(n.useEffect)(() => {
                const e = e => {
                        j(!0), (e => {
                            const t = Array(r);
                            t[e] = 2, c(t)
                        })(o), y(b), u == m && (() => {
                            if (Mt.instance) {
                                let e = {
                                    ackId: Object(g.a)(),
                                    linkId: i
                                };
                                setTimeout(() => {
                                    Mt.instance.emit("anon_query_control_info_ts", e)
                                }, 200)
                            }
                        })(), q.current = {
                            x: e.touches[0].clientX - F.x - Y.current.x,
                            y: e.touches[0].clientY - F.y - Y.current.y
                        }, f(s)
                    },
                    t = e => {
                        e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
                        let t = e.touches[0].clientX - F.x - q.current.x;
                        const i = -F.x + d.x,
                            n = d.x + d.width - F.x - T;
                        t < i ? t = i : t > n && (t = n);
                        let z = e.touches[0].clientY - F.y - q.current.y;
                        z < -N.current ? z = -N.current : z > 0 && (z = 0), Y.current.x = t, Y.current.y = z, _(), K(), P(-z)
                    },
                    n = () => {
                        j(!1), k === v && (w(!1), null === Mt || void 0 === Mt || Mt.instance.disconnect())
                    };
                if (E) {
                    const z = document.getElementById("pc-toy-control"),
                        A = e => {
                            let t = Y.current.y + e;
                            t < -N.current ? t = -N.current : t > 0 && (t = 0), Y.current.y = t, _(), K(), j(!0), a(), P(-t)
                        },
                        a = Object(H.debounce)(() => {
                            j(!1)
                        }, 100),
                        p = e => {
                            if (s !== M) return;
                            if (![38, 40].includes(e.keyCode)) return;
                            e.preventDefault();
                            let t = 40;
                            38 === e.keyCode && (t = -40), A(t)
                        },
                        l = e => {
                            if (s !== M) return;
                            e.preventDefault();
                            let t = 40;
                            e.deltaY ? e.deltaY < 0 && (t = -40) : e.detail && e.detail < 0 && (t = -40), A(t)
                        };

                    function x(e) {
                        e.touches = [{
                            clientX: e.clientX,
                            clientY: e.clientY
                        }]
                    }
                    z && (z.addEventListener("mousewheel", l, !1), z.addEventListener("DOMMouseScroll", l, !1), document.addEventListener("keyup", p, !1));
                    let h = U.current;
                    if (h) {
                        function R(i) {
                            x(i), e(i), document.onmousemove = function(e) {
                                x(e), t(e)
                            }, document.onmouseup = function(e) {
                                document.onmousemove = null, document.onmouseup = null, x(e), n()
                            }
                        }
                        h.onmousedown = R
                    }
                    return function() {
                        z && (z.removeEventListener("mousewheel", l, !1), z.removeEventListener("DOMMouseScroll", l, !1), document.removeEventListener("keyup", p, !1)), h && (h.onmousedown = null)
                    }
                } {
                    let O = U.current;
                    return O && (O.addEventListener("touchstart", e, {
                            passive: !1
                        }), O.addEventListener("touchmove", t, {
                            passive: !1
                        }), O.addEventListener("touchend", n, {
                            passive: !1
                        })),
                        function() {
                            O && (O.removeEventListener("touchstart", e), O.removeEventListener("touchmove", t), O.removeEventListener("touchend", n))
                        }
                }
            }, [F, M]), Object(n.useEffect)(() => () => {
                document.onmousemove = null, document.onmouseup = null
            }, []);
            const Z = Object(n.useMemo)(() => ({
                pink: "#FF2D89",
                blue: "#0C9EF2",
                purple: "#DE1EDB"
            }), []);

            function _() {
                if (r > 6) {
                    const e = -Y.current.y / N.current * 100,
                        t = /ball-img-(\w+)/.exec(X)[1],
                        i = {
                            background: `linear-gradient(0deg, ${Z[t]} ${e}%, #EAEAEA ${e}% 100%)`
                        };
                    S(i)
                }
            }
            return r > 6 ? d && Object(we.jsxs)("div", {
                className: "ball-slide",
                style: {
                    zIndex: p[o] || 1
                },
                children: [Object(we.jsxs)("div", {
                    className: "ball-ratio",
                    children: [parseInt(-Y.current.y / N.current * 100), "%"]
                }), Object(we.jsx)("div", {
                    className: "ball-bar",
                    style: B,
                    onClick: e => {
                        const {
                            y: t
                        } = e.target.getBoundingClientRect(), i = e.clientY - t;
                        Y.current.y = -(N.current - i), _(), Q(-Y.current.y), K(), f(s)
                    }
                }), Object(we.jsx)("div", {
                    ref: U,
                    id: s,
                    className: "drag-btn",
                    style: {
                        marginTop: N.current + "px",
                        transform: `translateY( ${Y.current.y}px)`
                    },
                    children: Object(we.jsxs)("div", {
                        className: `drag-btn-box ${X} ${L}`,
                        children: [Object(we.jsx)("img", {
                            src: G,
                            alt: ""
                        }), Object(we.jsx)("div", {
                            className: `toyname ${l.length>=8&&"minfont"} ${l.length>=9&&"line2"}`,
                            children: l
                        })]
                    })
                })]
            }) : Object(we.jsx)(we.Fragment, {
                children: Object(we.jsx)("div", {
                    className: "ball",
                    style: {
                        zIndex: p[o] || 1,
                        transform: `translate(${Y.current.x}px, ${Y.current.y}px)`
                    },
                    children: Object(we.jsx)("div", {
                        ref: U,
                        id: s,
                        className: "drag-btn",
                        children: Object(we.jsxs)("div", {
                            className: `drag-btn-box ${X} ${L}`,
                            children: [Object(we.jsx)("img", {
                                src: G,
                                alt: ""
                            }), Object(we.jsx)("div", {
                                className: `toyname ${l.length>=8&&"minfont"} ${l.length>=9&&"line2"}`,
                                children: l
                            })]
                        })
                    })
                })
            })
        });
        var Xt = Gt;
        i(1078);
        var qt = () => {
            const e = Se(e => e.linkId),
                t = Se(e => e.toys),
                i = Se(e => e.update_orderLine),
                s = Se(e => e.orderLine),
                A = Object(n.useRef)(s),
                r = Se(e => e.update_currentBallId),
                [o, a] = Object(n.useState)([]),
                [p, c] = Object(n.useState)([]),
                l = Object(n.useRef)(null),
                [d, E] = Object(n.useState)({}),
                x = Object(n.useRef)([]),
                u = (t || []).reduce((e, t) => e += t.toyFun.split(",").length, 0),
                g = u <= 2 ? 30 : 20,
                k = () => x.current.map((e, t) => {
                    if (e && e.current && e.current.getBallTranslate) {
                        return {
                            ballId: e.current.ballId,
                            toyId: e.current.toyId,
                            orderType: e.current.orderType,
                            translate: e.current.getBallTranslate(),
                            level: e.current.level
                        }
                    }
                    return null
                }).filter(Boolean);
            return Object(n.useEffect)(() => {
                E(l.current.getBoundingClientRect()),
                    function() {
                        if (t && t.length > 0) {
                            const e = [];
                            for (let i = 0; i < t.length; i++) {
                                let {
                                    id: n,
                                    name: z,
                                    type: s,
                                    version: A,
                                    status: r,
                                    toyFun: o = "v"
                                } = t[i];
                                o = "Tenera" === s || "Fizz" === s ? "s" : o;
                                const a = {
                                    toyId: n,
                                    name: z,
                                    type: s,
                                    version: A,
                                    status: r,
                                    toyFun: o
                                };
                                a.toyFunArr = o.split(","), a.toyFunArr.forEach(e => {
                                    let t = 1;
                                    t = ["v", "v1", "s"].includes(e) || "solace" === s.toLowerCase() && "t" === e ? 1 : "v3" === e ? 3 : 2;
                                    const i = k().find(t => t.toyId === n && t.orderType === e);
                                    if (i) {
                                        let e = i.level;
                                        ("number" !== typeof e || e < 0 || isNaN(e)) && (e = 0), a[`line${t}`] = [e]
                                    } else a[`line${t}`] = [0]
                                }), e.push(a)
                            }
                            i(T, e, "Balls")
                        }
                    }(),
                    function() {
                        if (t && t.length > 0) {
                            var e;
                            const i = t[0],
                                n = (null === (e = i.toyFun) || void 0 === e ? void 0 : e.split(",")[0]) || "v",
                                z = `${i.id}-drag-${n}-btn-id`;
                            r(z)
                        }
                    }()
            }, []), Object(n.useEffect)(() => {
                ! function() {
                    const i = [];
                    if (x.current = [], t && t.length) {
                        let n = 0;
                        for (let s = 0; s < t.length; s++) {
                            const A = t[s],
                                r = S[(A.type + "").toLowerCase()];
                            let o = A.version;
                            "1" == o && (o = "");
                            const a = (r || A.type) + (o ? " " + o : ""),
                                l = "Tenera" === r || "Fizz" === r ? ["s"] : A.toyFun.split(",");
                            for (let t = 0; t < l.length; t++) {
                                const s = l[t],
                                    r = `${A.id}-drag-${s}-btn-id`,
                                    o = z.a.createRef();
                                x.current.push(o), i.push(Object(we.jsx)(Xt, {
                                    ref: o,
                                    data: {
                                        linkId: e,
                                        orderType: s,
                                        toyName: a,
                                        ballCount: u,
                                        ballIndex: n,
                                        ballRadius: g,
                                        zIndex: p,
                                        setZIndex: c,
                                        toyId: A.id,
                                        ballId: r,
                                        ballListBoxPos: d
                                    }
                                }, A.id + s + t)), n++
                            }
                        }
                        a(i)
                    }
                }()
            }, [t, e, p, u, g, d]), Object(n.useEffect)(() => {
                A.current = s
            }, [s]), Object(n.useEffect)(() => {
                if ((/\/gcls\//i.test(window.location.pathname) ? M : m) === M) {
                    const e = setTimeout(() => {
                        ! function(e) {
                            if (t && t.length > 0) {
                                const n = [];
                                for (let i = 0; i < t.length; i++) {
                                    let {
                                        id: z,
                                        name: s,
                                        type: A,
                                        version: r,
                                        status: o,
                                        toyFun: a = "v"
                                    } = t[i];
                                    a = "Tenera" === A || "Fizz" === A ? "s" : a;
                                    const p = {
                                        toyId: z,
                                        name: s,
                                        type: A,
                                        version: r,
                                        status: o,
                                        toyFun: a
                                    };
                                    p.toyFunArr = a.split(","), p.toyFunArr.forEach(t => {
                                        let i = 1;
                                        i = ["v", "v1", "s"].includes(t) || "solace" === A.toLowerCase() && "t" === t ? 1 : "v3" === t ? 3 : 2;
                                        const n = `line${i}`;
                                        let s = !1;
                                        if (e && e.length > 0) {
                                            const t = e.find(e => e.toyId === z && e[n]);
                                            t && (p[n] = t[n], s = !0)
                                        }
                                        if (!s) {
                                            const e = k().find(e => e.toyId === z && e.orderType === t);
                                            if (e) {
                                                let t = e.level;
                                                ("number" !== typeof t || t < 0 || isNaN(t)) && (t = 0), p[`line${i}`] = [t]
                                            } else p[`line${i}`] = [0]
                                        }
                                    }), n.push(p)
                                }
                                i(T, n, "Balls")
                            }
                        }(A.current)
                    }, 50);
                    return () => clearTimeout(e)
                }
            }, [t]), Object(we.jsx)("div", {
                className: " " + (u > 6 ? "slide-balls-wrap" : "balls-wrap"),
                style: {
                    "--ballRadius": `${g}px`,
                    "--ballRadiusRem": g / 75 + "rem",
                    "--ballDiameter": 2 * g + "px"
                },
                children: Object(we.jsxs)("div", {
                    className: "balls-inner",
                    onTouchMove: e => {
                        e.stopPropagation()
                    },
                    children: [u > 6 && Object(we.jsxs)(we.Fragment, {
                        children: [Object(we.jsx)("div", {
                            className: "ball-item-rule"
                        }), " ", Object(we.jsx)("div", {
                            className: "ball-item-rule-num"
                        })]
                    }), Object(we.jsx)("div", {
                        ref: l,
                        className: "ball-list",
                        children: o
                    })]
                })
            })
        };
        i(1079);
        var Yt = e => {
            let {
                totalSeconds: t
            } = e;
            const [i, z] = Object(n.useState)(t);
            Object(n.useEffect)(() => {
                z(t)
            }, [t]), Object(n.useEffect)(() => {
                if (i <= 0) return;
                const e = setInterval(() => {
                    z(e => e - 1)
                }, 1e3);
                return () => clearInterval(e)
            }, [i]);
            return Object(we.jsx)("div", {
                className: "control-count-down",
                children: Object(we.jsxs)("div", {
                    className: "content",
                    children: [Object(we.jsx)("div", {
                        className: "text",
                        children: "It will be your turn in"
                    }), Object(we.jsx)("div", {
                        className: "time",
                        children: (e => {
                            const t = Math.floor(e / 60),
                                i = e % 60;
                            return Object(we.jsxs)(we.Fragment, {
                                children: [Object(we.jsx)("span", {
                                    className: "minutes",
                                    children: String(t).padStart(2, "0")
                                }), Object(we.jsx)("span", {
                                    className: "separator",
                                    children: ":"
                                }), Object(we.jsx)("span", {
                                    className: "seconds",
                                    children: String(i).padStart(2, "0")
                                })]
                            })
                        })(i)
                    })]
                })
            })
        };
        i(1080), i(1081);
        var Wt = e => {
            const t = Se(e => e.linkId),
                i = Se(e => e.toys),
                z = Se(e => e.controlPermission),
                s = Se(e => e.update_chatList),
                A = Se(e => e.isRequestingControl),
                r = Se(e => e.update_isRequestingControl);
            Object(n.useEffect)(() => {
                z.creatorExistUntreatedLiveControlRequest && Date.now() - z.creatorLastApplyLiveControlTime < 6e4 && r(!0)
            }, [z]);
            const o = (i || []).reduce((e, t) => e += t.toyFun.split(",").length, 0) <= 2 ? 30 : 24,
                a = Object(n.useCallback)(() => {
                    const e = !A;
                    Mt.instance.emit("cl_control_permission_request_ts", {
                        linkId: t,
                        linkPermissionType: "live_control",
                        operationType: e ? "request" : "cancel"
                    }), e || s([K(t, "Control request cancelled", `outroom-${t}`, "tips")], U), r(e), e && (je.get("joiner_cancel_occupy_countdown_" + t) || (je.set("joiner_cancel_occupy_countdown_" + t, 1), Mt.instance.emit("q_joiner_cancel_occupy_countdown_ts", {
                        linkId: t
                    }))), Oe({
                        logNo: "S0009",
                        content: JSON.stringify({
                            page_name: "Control Link Open",
                            event_id: e ? "controllinkjs_permission_popup_exposure" : "controllinkjs_permission_popup_disappear",
                            event_type: e ? "exposure" : "click",
                            element_id: "open_" + t,
                            element_content: "1"
                        }),
                        timeStamp: (new Date).getTime()
                    })
                }, [A]);
            return Object(we.jsx)(we.Fragment, {
                children: Object(we.jsx)("div", {
                    className: "pc-control-request",
                    style: {
                        "--ballRadius": `${o}px`,
                        "--ballDiameter": 2 * o + "px"
                    },
                    children: Object(we.jsx)("div", {
                        className: "ball-item",
                        onTouchMove: e => {
                            e.stopPropagation()
                        },
                        children: Object(we.jsxs)("div", {
                            className: "ball-list",
                            children: [Object(we.jsx)("div", {
                                className: "control-request-type",
                                children: "Live Control"
                            }), Object(we.jsxs)("div", {
                                className: `control-request-tips ${A&&"ellipsisflag"}`,
                                children: [A ? "Waiting for the other user to respond" : "You need to send a Live Control request to control the other user's toy.", "\xa0"]
                            }), Object(we.jsx)("div", {
                                className: "control-request-btn",
                                onClick: a,
                                children: A ? "Cancel" : "Send Request"
                            })]
                        })
                    })
                })
            })
        };
        i(1082), i(1083);
        var Jt = e => {
            let {
                ContentComponent: t,
                onCancel: i,
                onConfirm: z,
                data: s
            } = e;
            const A = e => {
                    e.stopPropagation()
                },
                r = Object(n.useRef)();
            return Object(n.useEffect)(() => {
                const e = r.current;
                return e.addEventListener("mousewheel", A, !1), e.addEventListener("DOMMouseScroll", A, !1),
                    function() {
                        e && (e.removeEventListener("mousewheel", A, !1), e.removeEventListener("DOMMouseScroll", A, !1))
                    }
            }, []), Object(we.jsx)(we.Fragment, {
                children: Object(we.jsxs)("div", {
                    ref: r,
                    className: "pc-layer",
                    children: [Object(we.jsx)("div", {
                        className: "layer-mask"
                    }), Object(we.jsx)("div", {
                        className: "layer-content",
                        children: Object(we.jsx)(t, {
                            onCancel: i,
                            onConfirm: z,
                            data: s
                        })
                    })]
                })
            })
        };
        i(1084);
        var Ht = e => {
            let {
                onCancel: t,
                onConfirm: i
            } = e;
            return Object(we.jsx)(we.Fragment, {
                children: Object(we.jsxs)("div", {
                    className: "end-Dialog",
                    children: [Object(we.jsx)("div", {
                        className: "text",
                        children: d.t("notification_end_control_link")
                    }), Object(we.jsx)("div", {
                        className: "btn cancel-btn",
                        onClick: t,
                        children: d.t("button_cancel")
                    }), Object(we.jsx)("div", {
                        className: "btn end-btn",
                        onClick: i,
                        children: d.t("button_end")
                    })]
                })
            })
        };
        const Kt = "/v2";
        let Zt = null,
            _t = null;
        var $t = e => {
                const {
                    LeftComponent: t,
                    setEndAndEndType: i,
                    exitChatRoom: s
                } = e, A = Se(e => e.linkId), r = Se(e => e.isEnd), o = Se(e => e.isInPc), a = Se(e => e.toys), p = Se(e => e.controlPermission), c = Se(e => e.chatMode), l = Se(e => e.controlLinkInfo), d = Se(e => e.controlState), E = Se(e => e.update_controlState), x = Se(e => e.groupSessionInfo), [u, k] = Object(n.useState)(""), [y, m] = z.a.useState(!1), [f, j] = Object(n.useState)(0);

                function h() {
                    if (a && a.length > 0) {
                        let e = {};
                        for (let n = 0; n < a.length; n++) {
                            e[a[n].id] = {
                                v: 0,
                                v1: 0,
                                v2: 0,
                                v3: 0,
                                s2: 0,
                                s: 0,
                                p: 0,
                                r: 0,
                                f: 0,
                                t: 0,
                                d: 0,
                                o: 0,
                                pos: 0
                            }
                        }
                        let t = JSON.stringify({
                                version: 5,
                                cate: "id",
                                id: e
                            }),
                            i = {
                                ackId: Object(g.a)(),
                                userTouch: !0
                            };
                        c === M ? (i.toyCommand = t, i.groupSessionId = A) : (i.toyCommandJson = t, i.linkId = A), Mt.instance && Mt.instance.emit(c === M ? "gcls_group_control_toy_command_ts" : "anon_command_link_ts", i)
                    }
                }
                Object(n.useEffect)(() => {
                    m(d === v)
                }, [d]), Object(n.useEffect)(() => {
                    R(f)
                }, [f]), Object(n.useEffect)(() => {
                    r && (clearTimeout(Zt), clearInterval(_t))
                }, [r]);

                function T() {
                    Zt = setTimeout(() => {
                        E(v), i(c === M ? {
                            end: !0,
                            endType: "manual"
                        } : {
                            end: !0,
                            endType: ""
                        })
                    }, 3e3)
                }
                const R = e => {
                    k(xe(Math.max(0, e)))
                };

                function N() {
                    if (0 === Object.keys(x).length || r) return;
                    let e = l.duration;
                    if (x.startControl) {
                        const t = e < 0;
                        let i = (x.sessionExpireTimestamp - Date.now()) / 1e3;
                        R(t ? i - 1 >= 0 ? i - 1 : 0 : i + 1), t ? (R(i++), _t = setInterval(() => {
                            R(i++)
                        }, 1e3)) : (R(i--), _t = setInterval(() => {
                            if (i <= 0) return E(v), h(), clearInterval(_t), void T();
                            R(i--)
                        }, 1e3))
                    } else R(e < 0 ? 0 : e)
                }
                Object(n.useEffect)(() => (c === M ? N() : function() {
                    if (clearInterval(_t), l) {
                        let e = l.leftControlTime;
                        if (l.isStart)
                            if (l.expires < 0) {
                                let t = e - 1;
                                t < 0 && (t = 0), j(t)
                            } else j(e + 1);
                        else l.expires < 0 ? (j(0), k("00:00")) : j(l.expires);
                        d === b && (l.expires < 0 ? (j(e => e + 1), _t = setInterval(() => {
                            j(e => e + 1)
                        }, 1e3)) : (j(e => e - 1), _t = setInterval(() => {
                            e - 1 <= 0 && a && a.length > 0 && (h(), clearInterval(_t), T()), j(e => e - 1)
                        }, 1e3)))
                    }
                }(), () => {
                    _t && clearInterval(_t), Zt && clearTimeout(Zt)
                }), [l, x]);
                return Object(we.jsxs)(we.Fragment, {
                    children: [Object(we.jsxs)("div", {
                        className: "flex between " + (o ? "pc-count-down" : "mobile-count-down"),
                        children: [Object(we.jsx)("div", {
                            className: "count-down-left flex acenter",
                            children: Object(we.jsx)(t, {})
                        }), Object(we.jsxs)("div", {
                            className: "count-down-right flex  acenter",
                            children: [Object(we.jsx)("div", {
                                className: "report-btn flex center column",
                                onClick: () => {
                                    c === M && x.groupSessionId ? window.open(`${window.location.origin}${Kt}/report?linkId=${A}&groupSessionId=${x.groupSessionId}`, "_blank") : window.open(`${window.location.origin}${Kt}/report?linkId=${A}`, "_blank")
                                },
                                children: Object(we.jsx)("i", {
                                    className: "report-img"
                                })
                            }), (p.joinerHasLiveControlPermission || !1 === p.openControlPermission) && Object(we.jsxs)("div", {
                                className: "end-btn flex column center",
                                onClick: () => {
                                    m(!0)
                                },
                                children: [Object(we.jsx)("i", {
                                    className: "end-img"
                                }), Object(we.jsx)("div", {
                                    className: "count-txt",
                                    children: u || ""
                                })]
                            })]
                        })]
                    }), y && Object(we.jsx)(Jt, {
                        ContentComponent: Ht,
                        onCancel: () => {
                            m(!1)
                        },
                        onConfirm: () => {
                            clearInterval(_t), E(v), h(), s(A, () => {
                                m(!1)
                            })
                        }
                    })]
                })
            },
            ei = (i(1085), i(294)),
            ti = i.n(ei);
        var ii = e => {
                let {
                    onCancel: t
                } = e;
                const {
                    t: i
                } = Object(Ce.a)(), [z, s] = Object(n.useState)(null), A = Se(e => e.qrCode);
                return Object(n.useEffect)(() => {
                    A && ti.a.toDataURL(A, {
                        type: "image/png",
                        quality: .5,
                        width: 130,
                        height: 130,
                        errorCorrectionLevel: "L",
                        margin: 2,
                        color: {
                            dark: "#000",
                            light: "#fff"
                        }
                    }).then(e => {
                        s(e)
                    })
                }, [A]), Object(we.jsx)(we.Fragment, {
                    children: Object(we.jsxs)("div", {
                        className: "qrcode",
                        children: [Object(we.jsx)("div", {
                            className: "close-area",
                            onClick: t,
                            children: Object(we.jsx)("img", {
                                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAA+UlEQVRIDe2UMQoCMRBFk4CewHIb8SKCVnYeVCwE2UbwImJj6QkUEn3qQkyyyRQRLHaKhZ28P38yya5SQ/zlBDZtu9zuDzNpc7BoUrwJk4DOqZ3Vt6PEBAYWTcokMjB2dNbKXZ+CpmTiFW/QoA0b1mGC9y+hVhfjxvP1anHyWQkDnzRgIVcgt4bWj14DoFQh8p+ZN7pndzBdZA2AQhNynI+kOGzRAMg3eYkEncMR0S16p+s9izvwu2csWFcbUVic64pBlUNOFe++hdwaDfiRHJGkgITBKDKQChFL2OgWWXOfOqUnknvOyDgXWDRoMS5Gzd910WwAfj6BB7y1A9qkCJa6AAAAAElFTkSuQmCC",
                                alt: ""
                            })
                        }), Object(we.jsxs)("div", {
                            className: "qrcode-box",
                            children: [Object(we.jsx)("div", {
                                className: "cwlr-txt",
                                children: i("open_remote_title")
                            }), Object(we.jsxs)("div", {
                                className: "gray-box",
                                children: [Object(we.jsxs)("div", {
                                    className: "box-item",
                                    children: [Object(we.jsx)("div", {
                                        className: "item-num",
                                        children: "1:"
                                    }), Object(we.jsx)("div", {
                                        className: "item-text",
                                        children: i("open_remote_des1")
                                    })]
                                }), Object(we.jsxs)("div", {
                                    className: "box-item",
                                    children: [Object(we.jsx)("div", {
                                        className: "item-num",
                                        children: "2:"
                                    }), Object(we.jsx)("div", {
                                        className: "item-text",
                                        children: i("open_remote_des2")
                                    })]
                                }), Object(we.jsxs)("div", {
                                    className: "box-item",
                                    children: [Object(we.jsx)("div", {
                                        className: "item-num",
                                        children: "3:"
                                    }), Object(we.jsx)("div", {
                                        className: "item-text",
                                        children: i("open_remote_des3")
                                    })]
                                })]
                            }), Object(we.jsx)("div", {
                                className: "scan-title",
                                children: i("open_remote_scan_qr")
                            }), Object(we.jsx)("div", {
                                className: "scan-tip",
                                children: i("open_remote_page_expire")
                            }), Object(we.jsx)("div", {
                                className: "qr-code-img",
                                children: Object(we.jsx)("img", {
                                    src: z,
                                    alt: ""
                                })
                            }), Object(we.jsx)("img", {
                                src: "data:image/png;base64,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",
                                alt: "",
                                className: "scan-preview-img"
                            })]
                        })]
                    })
                })
            },
            ni = i.p + "static/media/control_request.ee74514a.png";
        i(1106), i(1107);
        var zi = e => {
            let {
                message: t,
                duration: i = 3e3,
                onClose: z,
                withOverlay: s = !1
            } = e;
            const [A, r] = Object(n.useState)(!0);
            return Object(n.useEffect)(() => {
                const e = setTimeout(() => {
                    r(!1), z && z()
                }, i);
                return () => clearTimeout(e)
            }, [i, z]), A ? Object(we.jsxs)(we.Fragment, {
                children: [s && Object(we.jsx)("div", {
                    className: "toast-overlay",
                    onClick: () => r(!1)
                }), Object(we.jsx)("div", {
                    className: "toast",
                    children: Object(we.jsx)("span", {
                        className: "toast-message",
                        children: t
                    })
                })]
            }) : null
        };
        const si = z.a.createContext(),
            Ai = e => {
                let {
                    children: t
                } = e;
                const [i, z] = Object(n.useState)([]), s = e => {
                    z(t => t.filter(t => t.id !== e))
                };
                return Object(we.jsxs)(si.Provider, {
                    value: {
                        addToast: function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            const {
                                type: t = "info",
                                duration: i = 2e3,
                                content: n
                            } = e;
                            if (le()) return void u.b.error(n, i / 1e3);
                            const s = Date.now();
                            return z(e => [...e, {
                                id: s,
                                message: n,
                                type: t,
                                duration: i
                            }]), s
                        },
                        removeToast: s
                    },
                    children: [t, Object(we.jsx)("div", {
                        className: "toast-container",
                        children: i.map(e => Object(we.jsx)(zi, {
                            message: e.message,
                            type: e.type,
                            duration: e.duration,
                            onClose: () => s(e.id)
                        }, e.id))
                    })]
                })
            };
        let ri = [];
        const oi = [];
        var ai = e => {
            const {
                orgyToy: t,
                renderChatItemAndSendToServer: i
            } = e, [s, A] = Object(n.useState)([]), r = Se(e => e.controlLinkInfo), o = Se(e => e.update_orderLine), {
                addToast: a
            } = (() => {
                const e = z.a.useContext(si);
                if (!e) throw new Error("useToast must be used within a ToastProvider");
                return e
            })();
            Object(n.useEffect)(() => {
                function e(e) {
                    let {
                        toyInstructions: t = []
                    } = e;
                    t.forEach(e => {
                        let {
                            strength: t,
                            sustainTime: i
                        } = e, n = Math.round(i / 100);
                        if (!isNaN(n))
                            for (; n--;) ri.push(t)
                    })
                }
                return o(T, [t]), setInterval(() => {
                    let e = ri.shift() || 0;
                    o(R, {
                        toyId: t.toyId,
                        orderType: t.toyFun,
                        level: e
                    })
                }, 100), Mt.instance._events.gcls_group_control_im_toy_instruction_tc || Mt.instance.on("gcls_group_control_im_toy_instruction_tc", e), () => {
                    Mt.instance.off("gcls_group_control_im_toy_instruction_tc", e)
                }
            }, []), Object(n.useEffect)(() => {
                r && r.keywords && A(r.keywords)
            }, [r]);
            return Object(we.jsxs)("div", {
                className: "quick-control",
                children: [Object(we.jsx)("div", {
                    className: "control-title",
                    children: "Quick Post"
                }), Object(we.jsx)("div", {
                    className: "control-contain",
                    children: Object(we.jsx)("ul", {
                        children: s.map(e => Object(we.jsx)("li", {
                            onClick: t => (e => {
                                const t = Date.now();
                                for (; oi.length > 0 && t - oi[0] > 1e4;) oi.shift();
                                oi.length >= 15 ? a({
                                    content: "Operated frequently. Please try again later.",
                                    duration: 2e3
                                }) : (oi.push(t), i(e))
                            })(e),
                            children: e
                        }, e))
                    })
                })]
            })
        };
        const pi = null === y || void 0 === y ? void 0 : y.enableDebugLogger;
        let ci = null;
        pi && (ci = i(170).default);
        const li = {
            id: Object(g.a)(),
            type: "solace pro",
            name: "Orgy Control",
            version: "",
            toyFun: "t",
            toyFunArr: ["t"],
            line2: [0]
        };
        li.toyId = li.id;
        var di = e => {
                const {
                    exitChatRoom: t,
                    renderChatItemAndSendToServer: i
                } = e, {
                    t: z
                } = Object(Ce.a)(), s = Se(e => e.isInPc), A = Se(e => e.controlMode), r = Se(e => e.chatMode), o = Se(e => e.fromCam), a = Se(e => e.user), p = Se(e => e.controlPermission), c = Se(e => e.groupSessionMemberList), l = Se(e => e.groupSessionInfo), [d, E] = Object(n.useState)(!1), [x, u] = Object(n.useState)(0);
                Object(n.useEffect)(() => {
                    const e = c[1];
                    e && E(e.userId === a.userId)
                }, [c, a]), Object(n.useEffect)(() => {
                    if (d || !c || !l) return;
                    const e = c.findIndex(e => e.userId === a.userId) - 1 - 1;
                    if (e < 0) return void u(0);
                    const t = e * l.eachControlLastsDuration,
                        i = c[1],
                        n = Date.now(),
                        z = new Date(i.willBeEndControlTimestamp).getTime(),
                        s = t + Math.max(0, Math.floor((z - n) / 1e3));
                    u(Math.max(0, s))
                }, [c, l, d, a]);
                const [g, k] = Object(n.useState)(!1), y = () => {
                    k(!0)
                }, [m, f] = Object(n.useState)(!1);
                Object(n.useEffect)(() => {
                    (p.joinerHasLiveControlPermission || !1 === p.openControlPermission) && f(!0)
                }, [p]);
                const [j, h] = Object(n.useState)(!1), [b, v] = Object(n.useState)([]), [T, R] = Object(n.useState)(!0), N = Object(n.useRef)(null), U = Object(n.useRef)(!0), [F, O] = Object(n.useState)({
                    memoryUsed: 0,
                    memoryTotal: 0,
                    cpuUsage: 0,
                    fps: 0
                }), D = Object(n.useRef)({
                    lastTime: performance.now(),
                    lastIdleTime: 0,
                    usage: 0
                });
                Object(n.useEffect)(() => {
                    if (!pi || !ci) return;
                    if (!j) return void v([]);
                    const e = ci.getLogs();
                    v(e || []);
                    const t = ci.subscribe(e => {
                        v(e || [])
                    });
                    return () => {
                        t && t()
                    }
                }, [j]), Object(n.useEffect)(() => {
                    j && N.current && b.length > 0 && setTimeout(() => {
                        const e = N.current;
                        if (!e) return;
                        (e.scrollHeight - e.scrollTop - e.clientHeight <= 8 || U.current) && (e.scrollTop = e.scrollHeight - e.clientHeight, U.current = !0)
                    }, 0)
                }, [b, j]), Object(n.useEffect)(() => {
                    if (!pi) return;
                    let e = performance.now(),
                        t = 0,
                        i = 0,
                        n = null;
                    const z = () => {
                        const s = performance.now(),
                            A = s - e;
                        if (A > 0) {
                            i += A;
                            const n = 1e3 / 60;
                            if (A > 1.5 * n && (t += A - n), i >= 500) {
                                const e = Math.min(100, Math.round(t / i * 100));
                                D.current.usage = e, t = 0, i = 0
                            }
                            e = s
                        }
                        n = requestAnimationFrame(z)
                    };
                    n = requestAnimationFrame(z);
                    const s = () => {
                        var e;
                        let t = 0,
                            i = 0;
                        performance.memory ? (t = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024), i = performance.memory.jsHeapSizeLimit ? Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) : Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)) : navigator.deviceMemory && (i = Math.round(1024 * navigator.deviceMemory), t = Math.round(.1 * i));
                        const n = (null === St || void 0 === St || null === (e = St.getTargetFPS) || void 0 === e ? void 0 : e.call(St)) || 0;
                        O({
                            memoryUsed: t,
                            memoryTotal: i,
                            cpuUsage: D.current.usage,
                            fps: n
                        })
                    };
                    s();
                    const A = setInterval(s, 1e3);
                    return () => {
                        n && cancelAnimationFrame(n), clearInterval(A)
                    }
                }, [pi]);
                const S = e => {
                    const t = e.currentTarget,
                        i = t.scrollHeight - t.scrollTop - t.clientHeight;
                    U.current = i <= 8
                };
                return s ? Object(we.jsxs)(we.Fragment, {
                    children: [Object(we.jsxs)("div", {
                        id: "pc-toy-control",
                        className: "pc-toy-control",
                        children: [A === B ? m ? Object(we.jsxs)(we.Fragment, {
                            children: [Object(we.jsx)("div", {
                                className: "order-line-wrap",
                                children: Object(we.jsx)(Qt, {
                                    isBloomEnabled: T
                                })
                            }), d || r !== M ? Object(we.jsx)(qt, {}) : Object(we.jsx)(Yt, {
                                totalSeconds: x,
                                setAtControl: E
                            })]
                        }) : Object(we.jsxs)(we.Fragment, {
                            children: [Object(we.jsx)("div", {
                                className: "pc-order-line-control-request",
                                children: Object(we.jsx)("img", {
                                    src: ni,
                                    alt: ""
                                })
                            }), Object(we.jsx)(Wt, {})]
                        }) : Object(we.jsxs)(we.Fragment, {
                            children: [Object(we.jsx)("div", {
                                className: "order-line-wrap",
                                children: Object(we.jsx)(Qt, {
                                    orgyToys: [li],
                                    isBloomEnabled: T
                                }, 2)
                            }), Object(we.jsx)(ai, {
                                orgyToy: li,
                                renderChatItemAndSendToServer: i
                            })]
                        }), Object(we.jsx)("div", {
                            className: "count-down-wrap",
                            children: Object(we.jsx)($t, {
                                exitChatRoom: t,
                                LeftComponent: () => Object(we.jsx)(we.Fragment, {
                                    children: !o && Object(we.jsxs)("div", {
                                        className: "connect-remote flex acenter",
                                        onClick: y,
                                        children: [Object(we.jsx)("img", {
                                            className: "img-logo",
                                            src: Xe,
                                            alt: ""
                                        }), Object(we.jsx)("div", {
                                            className: "txt ellipsis",
                                            children: z("button_open_remote")
                                        })]
                                    })
                                })
                            })
                        }), Object(we.jsxs)("div", {
                            style: {
                                position: "relative"
                            },
                            children: [pi && Object(we.jsxs)("div", {
                                style: {
                                    position: "fixed",
                                    right: 145,
                                    bottom: 8,
                                    zIndex: 10001,
                                    height: "30px",
                                    padding: "0 8px",
                                    margin: 0,
                                    background: "rgba(0, 0, 0, 0.7)",
                                    color: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    fontSize: "10px",
                                    lineHeight: "30px",
                                    boxSizing: "border-box",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    whiteSpace: "nowrap"
                                },
                                children: [Object(we.jsxs)("span", {
                                    children: ["\u5185\u5b58:", F.memoryUsed, "M/", F.memoryTotal, "M"]
                                }), Object(we.jsx)("span", {
                                    children: "|"
                                }), Object(we.jsxs)("span", {
                                    children: ["CPU:", F.cpuUsage, "%"]
                                }), Object(we.jsx)("span", {
                                    children: "|"
                                }), Object(we.jsxs)("span", {
                                    children: ["FPS:", F.fps]
                                })]
                            }), pi && Object(we.jsx)("button", {
                                type: "button",
                                onClick: e => {
                                    e.stopPropagation(), e.preventDefault(), R(e => !e)
                                },
                                style: {
                                    position: "fixed",
                                    right: pi ? 75 : 8,
                                    bottom: 8,
                                    zIndex: 10001,
                                    height: "30px",
                                    padding: "0 8px",
                                    margin: 0,
                                    background: T ? "#0C9EF2" : "#fff",
                                    color: T ? "#fff" : "#333",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    lineHeight: "30px",
                                    boxSizing: "border-box",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    pointerEvents: "auto",
                                    visibility: "visible",
                                    opacity: 1,
                                    outline: "none",
                                    fontFamily: "inherit",
                                    display: "inline-block",
                                    verticalAlign: "bottom"
                                },
                                children: T ? "\u5149\u6655\uff1a\u5f00" : "\u5149\u6655\uff1a\u5173"
                            }), pi && Object(we.jsx)("button", {
                                type: "button",
                                onClick: e => {
                                    e.stopPropagation(), e.preventDefault(), h(e => !e)
                                },
                                style: {
                                    position: "fixed",
                                    right: 8,
                                    bottom: 8,
                                    zIndex: 10001,
                                    height: "30px",
                                    padding: "0 8px",
                                    margin: 0,
                                    background: j ? "#ff2d89" : "#0C9EF2",
                                    color: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    lineHeight: "30px",
                                    boxSizing: "border-box",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    pointerEvents: "auto",
                                    visibility: "visible",
                                    opacity: 1,
                                    outline: "none",
                                    fontFamily: "inherit",
                                    display: "inline-block",
                                    verticalAlign: "bottom"
                                },
                                children: j ? "\u5173\u95ed\u8c03\u8bd5" : "\u663e\u793a\u8c03\u8bd5"
                            })]
                        }), pi && j && Object(we.jsx)("div", {
                            style: {
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                width: "100%",
                                height: "200px",
                                zIndex: 1e4,
                                background: "rgba(0, 0, 0, 0.85)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                visibility: "visible",
                                opacity: 1,
                                pointerEvents: "auto"
                            },
                            children: Object(we.jsxs)("div", {
                                ref: N,
                                style: {
                                    flex: 1,
                                    minHeight: 0,
                                    maxHeight: "100%",
                                    overflow: "auto",
                                    overflowX: "hidden",
                                    color: "#fff",
                                    fontFamily: "monospace",
                                    lineHeight: "1.2",
                                    fontSize: "10px",
                                    padding: "6px",
                                    paddingBottom: "10px",
                                    boxSizing: "border-box",
                                    WebkitOverflowScrolling: "touch"
                                },
                                onScroll: S,
                                children: [Object(we.jsxs)("div", {
                                    style: {
                                        marginBottom: "4px",
                                        position: "sticky",
                                        top: 0,
                                        background: "rgba(0, 0, 0, 0.95)",
                                        padding: "3px 0",
                                        zIndex: 1,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    },
                                    children: [Object(we.jsx)("strong", {
                                        style: {
                                            fontSize: "11px"
                                        },
                                        children: "\ud83d\udd0d \u63a7\u5236\u53f0\u65e5\u5fd7"
                                    }), Object(we.jsxs)("div", {
                                        children: [Object(we.jsx)("button", {
                                            onClick: async e => {
                                                e.stopPropagation(), e.preventDefault();
                                                const t = document.activeElement;
                                                if (await ci.copyToClipboard() && setTimeout(() => {
                                                        ci.log("info", "\u2705 \u65e5\u5fd7\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f")
                                                    }, 100), t && t !== document.body) try {
                                                    t.focus()
                                                } catch (e) {}
                                            },
                                            style: {
                                                padding: "2px 6px",
                                                marginRight: "4px",
                                                background: "#0C9EF2",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "10px"
                                            },
                                            children: "\u590d\u5236"
                                        }), Object(we.jsx)("button", {
                                            onClick: e => {
                                                e.stopPropagation(), ci.clear(), v([])
                                            },
                                            style: {
                                                padding: "2px 6px",
                                                background: "#ff2d89",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "10px"
                                            },
                                            children: "\u6e05\u7a7a"
                                        })]
                                    })]
                                }), Object(we.jsx)("div", {
                                    children: b.length > 0 ? b.map((e, t) => {
                                        const i = "error" === e.level ? "#ff4444" : "warn" === e.level ? "#ffaa00" : "#fff";
                                        return Object(we.jsxs)("div", {
                                            style: {
                                                marginBottom: "1px",
                                                wordBreak: "break-word",
                                                color: i,
                                                fontSize: "9px",
                                                lineHeight: "1.3"
                                            },
                                            children: [Object(we.jsxs)("span", {
                                                style: {
                                                    color: "#888"
                                                },
                                                children: ["[", e.timestamp, "]"]
                                            }), " ", Object(we.jsxs)("span", {
                                                style: {
                                                    color: "#0C9EF2"
                                                },
                                                children: ["[", e.level.toUpperCase(), "]"]
                                            }), " ", e.message]
                                        }, `console-${t}`)
                                    }) : Object(we.jsx)("div", {
                                        style: {
                                            color: "#888",
                                            fontSize: "9px"
                                        },
                                        children: "\u6682\u65e0\u63a7\u5236\u53f0\u65e5\u5fd7..."
                                    })
                                })]
                            })
                        })]
                    }), g && Object(we.jsx)(Jt, {
                        ContentComponent: ii,
                        onCancel: () => {
                            k(!1)
                        }
                    })]
                }) : A === B ? Object(we.jsx)(we.Fragment, {
                    children: d || r !== M ? Object(we.jsx)(we.Fragment, {
                        children: Object(we.jsxs)("div", {
                            className: "toy-control",
                            children: [Object(we.jsx)(Qt, {
                                isBloomEnabled: T
                            }, 1), Object(we.jsxs)("div", {
                                className: "balls-control",
                                style: {
                                    position: "relative"
                                },
                                children: [Object(we.jsx)("div", {
                                    className: "balls",
                                    children: Object(we.jsx)(qt, {})
                                }), pi && Object(we.jsxs)("div", {
                                    style: {
                                        position: "fixed",
                                        right: 145,
                                        bottom: 8,
                                        zIndex: 10001,
                                        height: "30px",
                                        padding: "0 8px",
                                        margin: 0,
                                        background: "rgba(0, 0, 0, 0.7)",
                                        color: "#fff",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "10px",
                                        lineHeight: "30px",
                                        boxSizing: "border-box",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        whiteSpace: "nowrap"
                                    },
                                    children: [Object(we.jsxs)("span", {
                                        children: ["\u5185\u5b58:", F.memoryUsed, "M/", F.memoryTotal, "M"]
                                    }), Object(we.jsx)("span", {
                                        children: "|"
                                    }), Object(we.jsxs)("span", {
                                        children: ["CPU:", F.cpuUsage, "%"]
                                    }), Object(we.jsx)("span", {
                                        children: "|"
                                    }), Object(we.jsxs)("span", {
                                        children: ["FPS:", F.fps]
                                    })]
                                }), pi && Object(we.jsx)("button", {
                                    type: "button",
                                    onClick: e => {
                                        e.stopPropagation(), e.preventDefault(), R(e => !e)
                                    },
                                    style: {
                                        position: "fixed",
                                        right: pi ? 75 : 8,
                                        bottom: 8,
                                        zIndex: 10001,
                                        height: "30px",
                                        padding: "0 8px",
                                        margin: 0,
                                        background: T ? "#0C9EF2" : "#fff",
                                        color: T ? "#fff" : "#333",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        lineHeight: "30px",
                                        boxSizing: "border-box",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                        pointerEvents: "auto",
                                        visibility: "visible",
                                        opacity: 1,
                                        outline: "none",
                                        fontFamily: "inherit",
                                        display: "inline-block",
                                        verticalAlign: "bottom"
                                    },
                                    children: T ? "\u5149\u6655\uff1a\u5f00" : "\u5149\u6655\uff1a\u5173"
                                }), pi && Object(we.jsx)("button", {
                                    type: "button",
                                    onClick: e => {
                                        e.stopPropagation(), e.preventDefault(), h(e => !e)
                                    },
                                    style: {
                                        position: "fixed",
                                        right: 8,
                                        bottom: 8,
                                        zIndex: 10001,
                                        height: "30px",
                                        padding: "0 8px",
                                        margin: 0,
                                        background: j ? "#ff2d89" : "#0C9EF2",
                                        color: "#fff",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        lineHeight: "30px",
                                        boxSizing: "border-box",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                        pointerEvents: "auto",
                                        visibility: "visible",
                                        opacity: 1,
                                        outline: "none",
                                        fontFamily: "inherit",
                                        display: "inline-block",
                                        verticalAlign: "bottom"
                                    },
                                    children: j ? "\u5173\u95ed\u8c03\u8bd5" : "\u663e\u793a\u8c03\u8bd5"
                                })]
                            }), pi && j && Object(we.jsx)("div", {
                                style: {
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    width: "100%",
                                    height: "200px",
                                    zIndex: 1e4,
                                    background: "rgba(0, 0, 0, 0.85)",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    visibility: "visible",
                                    opacity: 1,
                                    pointerEvents: "auto"
                                },
                                children: Object(we.jsxs)("div", {
                                    ref: N,
                                    style: {
                                        flex: 1,
                                        minHeight: 0,
                                        maxHeight: "100%",
                                        overflow: "auto",
                                        overflowX: "hidden",
                                        color: "#fff",
                                        fontFamily: "monospace",
                                        lineHeight: "1.2",
                                        fontSize: "10px",
                                        padding: "6px",
                                        paddingBottom: "10px",
                                        boxSizing: "border-box",
                                        WebkitOverflowScrolling: "touch"
                                    },
                                    onScroll: S,
                                    children: [Object(we.jsxs)("div", {
                                        style: {
                                            marginBottom: "4px",
                                            position: "sticky",
                                            top: 0,
                                            background: "rgba(0, 0, 0, 0.95)",
                                            padding: "3px 0",
                                            zIndex: 1,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        },
                                        children: [Object(we.jsx)("strong", {
                                            style: {
                                                fontSize: "11px"
                                            },
                                            children: "\ud83d\udd0d \u63a7\u5236\u53f0\u65e5\u5fd7"
                                        }), Object(we.jsxs)("div", {
                                            children: [Object(we.jsx)("button", {
                                                onClick: async e => {
                                                    e.stopPropagation(), e.preventDefault();
                                                    const t = document.activeElement;
                                                    if (await ci.copyToClipboard() && setTimeout(() => {
                                                            ci.log("info", "\u2705 \u65e5\u5fd7\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f")
                                                        }, 100), t && t !== document.body) try {
                                                        t.focus()
                                                    } catch (e) {}
                                                },
                                                style: {
                                                    padding: "2px 6px",
                                                    marginRight: "4px",
                                                    background: "#0C9EF2",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "10px"
                                                },
                                                children: "\u590d\u5236"
                                            }), Object(we.jsx)("button", {
                                                onClick: e => {
                                                    e.stopPropagation(), ci.clear(), v([])
                                                },
                                                style: {
                                                    padding: "2px 6px",
                                                    background: "#ff2d89",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "10px"
                                                },
                                                children: "\u6e05\u7a7a"
                                            })]
                                        })]
                                    }), Object(we.jsx)("div", {
                                        children: b.length > 0 ? b.map((e, t) => {
                                            const i = "error" === e.level ? "#ff4444" : "warn" === e.level ? "#ffaa00" : "#fff";
                                            return Object(we.jsxs)("div", {
                                                style: {
                                                    marginBottom: "1px",
                                                    wordBreak: "break-word",
                                                    color: i,
                                                    fontSize: "9px",
                                                    lineHeight: "1.3"
                                                },
                                                children: [Object(we.jsxs)("span", {
                                                    style: {
                                                        color: "#888"
                                                    },
                                                    children: ["[", e.timestamp, "]"]
                                                }), " ", Object(we.jsxs)("span", {
                                                    style: {
                                                        color: "#0C9EF2"
                                                    },
                                                    children: ["[", e.level.toUpperCase(), "]"]
                                                }), " ", e.message]
                                            }, `console-${t}`)
                                        }) : Object(we.jsx)("div", {
                                            style: {
                                                color: "#888",
                                                fontSize: "9px"
                                            },
                                            children: "\u6682\u65e0\u63a7\u5236\u53f0\u65e5\u5fd7..."
                                        })
                                    })]
                                })
                            }), Object(we.jsx)("div", {
                                className: "b-space"
                            })]
                        })
                    }) : Object(we.jsx)(Yt, {
                        totalSeconds: x,
                        setAtControl: E
                    })
                }) : Object(we.jsx)(we.Fragment, {
                    children: Object(we.jsxs)("div", {
                        className: "toy-control toy-quick-control",
                        children: [Object(we.jsx)(Qt, {
                            orgyToys: [li]
                        }, 2), Object(we.jsx)(ai, {
                            orgyToy: li,
                            renderChatItemAndSendToServer: i
                        })]
                    })
                })
            },
            Ei = i(295),
            xi = i.n(Ei),
            ui = (i(1113), i.p + "static/media/control_request_icon.031a4105.svg");
        const gi = {},
            ki = {};

        function yi() {
            let e = Date.now();
            return ki[e] ? e = `${e}_${ki[e]+1}` : ki[e] = 1, e
        }
        var mi = (e, t, i) => {
            const z = Se(e => e.groupSessionMemberList),
                s = Object(n.useRef)(null),
                A = Se(e => e.update_chatList),
                r = Se(e => e.linkId),
                o = Se(e => e.user);
            Object(n.useEffect)(() => {
                const e = s.current,
                    t = z;
                if ((!e || e && 0 === e.length) && t) {
                    const e = t.find(e => "Host" === e.nickName);
                    e && !e.onLine && A([K(r, "The creator hasn't joined this room yet, You can still control their toys(s)", yi(), I)], U)
                }
                if (e && e.length > 0 && e.length !== t.length) {
                    const i = t.filter(t => !e.some(e => e.userId === t.userId)),
                        n = e.filter(e => !t.some(t => t.userId === e.userId));
                    i.length > 0 && i.forEach(e => {
                        A([K(r, `${e.nickName} joined the room.`, yi(), I)], U)
                    }), n.length > 0 && n.forEach(e => {
                        A([K(r, `${e.nickName} left the room.`, yi(), I)], U)
                    })
                }
                if (e && e.length > 0) {
                    t.forEach(t => {
                        const n = e.find(e => e.userId === t.userId);
                        if (n) {
                            const e = {};
                            n.onLine !== t.onLine ? (e.onLine = {
                                from: n.onLine,
                                to: t.onLine
                            }, t.onLine ? gi[t.userId] >= 1 && (A([K(r, `${t.nickName} reconnected.`, yi(), I)], U), delete gi[t.userId]) : gi[t.userId] ? gi[t.userId] += 1 : gi[t.userId] = 1) : t.onLine ? delete gi[t.userId] : gi[t.userId] ? gi[t.userId] += 1 : gi[t.userId] = 1, Object.keys(e).length > 0 && i && i(t, e)
                        }
                    });
                    for (const e in gi)
                        if (Object.prototype.hasOwnProperty.call(gi, e)) {
                            if (3 === gi[e]) {
                                const i = t.find(t => t.userId === e);
                                i && A([K(r, `${i.nickName} disconnected.`, yi(), I)], U)
                            }
                        }
                }
                if (o) {
                    const i = e && e.find(e => e.userId === o.userId),
                        n = t.find(e => e.userId === o.userId);
                    if ((i && n || !i && n) && (i && i.atControl !== n.atControl || !i && n.atControl)) {
                        let e = "Your control session has ended.";
                        n.atControl && (e = "It's your turn to control!"), A([K(r, e, yi(), I)], U)
                    }
                }
                s.current = t
            }, [z, r, o, e, t, i])
        };
        const Mi = "prohibitedWords";
        const fi = {
            partId: "",
            count: 0
        };

        function ji(e, t) {
            const i = {
                hasProhibited: !1,
                tipsKey: "",
                defaultTips: "",
                type: "",
                partId: ""
            };
            let n = e;
            try {
                if (n = Y.aesDecryptXy(e), n) try {
                    const e = JSON.parse(n);
                    e.text && (n = e.text)
                } catch (z) {} else n = e
            } catch (z) {
                console.error("aesDecryptXy error: ", z)
            }
            return Array.isArray(t) && t.length && t.some(e => {
                const t = e.rules;
                return i.hasProhibited = t.some(e => (e.list || []).some(t => {
                    const z = new RegExp(Object(qe.b)(t.reg), "ig").test(n);
                    return z && (i.tipsKey = t.key, i.defaultTips = t.defaultText, i.type = e.type, i.partId = e.partId), z
                })), i.hasProhibited
            }), "combined" === i.type ? 0 === fi.count ? (fi.count = 1, fi.partId = i.partId, i.hasProhibited = !1) : fi.count <= 10 && (fi.partId !== i.partId ? (fi.count = 0, fi.partId = "") : (fi.count = 1, fi.partId = i.partId, i.hasProhibited = !1)) : 0 !== fi.count && (fi.count++, fi.count >= 10 && (fi.count = 0, fi.partId = "")), i
        }

        function hi(e, t) {
            const i = {
                hasProhibited: !1,
                tipsKey: "",
                defaultTips: ""
            };
            for (let n = 0; n < e.length; n++) {
                const z = ji(e[n], t);
                if (z.hasProhibited) {
                    i.hasProhibited = !0, i.tipsKey = z.tipsKey, i.defaultTips = z.defaultTips;
                    break
                }
            }
            return i
        }
        var bi = () => {
            const e = Object(n.useRef)([]);
            return Object(n.useEffect)(() => {
                (async function() {
                    let e = await k.get(y.reportUrl + "/remote/init/v2/sensitive");
                    if (e.result && e.data) return e.data;
                    throw new Error(e.message)
                })().then(t => {
                    e.current = t, localStorage.setItem(Mi, JSON.stringify(t))
                }).catch(t => {
                    const i = localStorage.getItem(Mi);
                    if (i) try {
                        e.current = JSON.parse(i)
                    } catch (n) {}
                })
            }, []), {
                prohibitedWordRef: e
            }
        };
        const vi = {},
            Ti = (e, t) => {
                const {
                    sendMsgToServer: z,
                    exitChatRoom: s
                } = e, A = Se(e => e.chatMode), r = Se(e => e.isSupportOrgy), o = Se(e => e.controlMode), a = Se(e => e.creatorId), p = Se(e => e.timestampDiff), c = Se(e => e.user), l = Se(e => e.chatList), d = Se(e => e.isInPc), E = Se(e => e.qrCode), x = Se(e => e.linkId), u = Se(e => e.controlPermission), k = Se(e => e.isRequestingControl), m = Se(e => e.update_isRequestingControl), f = Se(e => e.isOperatePanelClose), j = Se(e => e.update_isOperatePanelClose), h = Se(e => e.update_chatList), b = Object(n.useRef)(null), [v, T] = Object(n.useState)(null), [R, N] = Object(n.useState)(!1), [F, D] = Object(n.useState)(!1), [S, w] = Object(n.useState)(!1), [L, V] = Object(n.useState)(!0), [Q, P] = Object(n.useState)({
                    start: 0,
                    end: 0
                }), [G, X] = Object(n.useState)(!1), [q, Y] = Object(n.useState)(!1), [W, J] = Object(n.useState)(!1), [$, ee] = Object(n.useState)(!1), ie = Se(e => e.groupSessionInfo), ne = Object(n.useRef)(!1), ze = Object(n.useRef)(0), se = Object(n.useRef)(0), Ae = Object(n.useRef)(!1), [re, oe] = Object(n.useState)(!1), [ae, pe] = Object(n.useState)(""), ce = Object(n.useRef)(null), le = Object(n.useRef)(null), de = Object(n.useRef)(!1), Ee = Object(n.useRef)(!1), {
                    t: xe
                } = Object(Ce.a)(), ue = Object(n.useRef)(l);
                Object(n.useEffect)(() => {
                    ue.current = l
                }, [l]), Object(n.useEffect)(() => {
                    f || (X(!1), D(!1), V(!1))
                }, [f]);
                Object(n.useEffect)(() => {
                    u.creatorExistUntreatedLiveControlRequest && Date.now() - u.creatorLastApplyLiveControlTime < 6e4 && m(!0)
                }, [u, u]);
                const ge = e => {
                    ne.current = !1;
                    const {
                        ackCode: t,
                        ackId: i,
                        tips: n = ""
                    } = e;
                    let z = [...ue.current],
                        s = z[z.map(e => e.ackId).indexOf(i)];
                    s && (s.msgWaitState = "", 12 !== t ? s.msgWaitState = "error" : Ie(i)), 12 !== t && n && (oe(!0), pe(n), setTimeout(() => {
                        pe("")
                    }, 2e3)), s && h([s], O)
                };
                Object(n.useImperativeHandle)(t, () => ({
                    renderChatItemAndSendToServer: De
                }));
                const ke = () => {
                        X(!0), Y(!q), j(!0), b.current.blur(), b.current.focus(), d ? D(!F) : (F && D(!1), be(), he(), w(!1))
                    },
                    ye = function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 800;
                        e && (oe(!0), pe(e), setTimeout(() => {
                            pe(""), ce.current && ce.current.isRecording() && ce.current.finishWAVRecord()
                        }, t))
                    },
                    me = e => {
                        if (e && "skip" !== e && e.preventDefault(), clearTimeout(le.current), "skip" !== e) {
                            if (Date.now() - se.current < 1e3) return se.current = 0, pe(""), void(ce.current && ce.current.isRecording() && ce.current.finishWAVRecord());
                            if (Ae.current) return void ye("Cancel the recording");
                            if (Date.now() - se.current < 3e3) return se.current = 0, void ye("Message is too short");
                            if (0 === se.current) return
                        }
                        de.current || (de.current = !0, pe(""), ce.current && ce.current.finishWAVRecord().then(async () => {
                            let e = ce.current.getWAVBlob(),
                                t = new window.File([e], "record.am"),
                                i = new FormData;
                            i.append("file", t), i.append("business", A === M ? "group_link" : "one_link"), i.append("toId", A === M ? ie.groupSessionId : x);
                            let n = "",
                                z = !1,
                                s = Math.round((Date.now() - se.current) / 1e3);
                            s > 60 && (s = 60);
                            try {
                                const {
                                    data: e
                                } = await Ne(i);
                                n = e, z = !0
                            } catch (a) {
                                n = window.URL.createObjectURL(e)
                            }
                            let r = Le(n, s);
                            z ? Be(r) : (r.blob = e, r.voiceUrl = n, r.audioUrl = n, r.msgWaitState = "error");
                            let o = Date.now();
                            h([{
                                ...r,
                                timestamp: o
                            }], U), de.current = !1, se.current = 0
                        }).catch(() => {
                            ye("The recording failure"), w(!1), de.current = !1, se.current = 0
                        }))
                    },
                    Me = e => {
                        N(!0)
                    },
                    fe = e => {
                        N(!1)
                    };
                Object(n.useEffect)(() => {
                    R && setTimeout(() => {
                        document.getElementsByTagName("html")[0].scrollTop = document.body.scrollHeight;
                        let e = document.getElementById("lvs-chat-list");
                        if (e && (e.scrollTop = e.scrollHeight), /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            window.scrollTo(0, document.body.scrollHeight), document.body.scrollTop = document.body.scrollHeight;
                            const e = b.current;
                            e && e.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            })
                        }
                    }, 300)
                }, [R]), Object(n.useEffect)(() => {
                    if (window.visualViewport && !d) {
                        function e() {
                            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) setTimeout(() => {
                                window.scrollTo(0, document.body.scrollHeight);
                                const e = b.current;
                                e && e.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center"
                                })
                            }, 100);
                            else {
                                var e = document.querySelector("#root");
                                const t = window.innerHeight - window.visualViewport.height;
                                if (t > 20) {
                                    e.style.height = window.innerHeight - t + "px", e.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                    let i = document.getElementById("lvs-chat-list");
                                    i && (i.scrollTop = i.scrollHeight)
                                } else e.style.height = document.body.clientHeight + "px"
                            }
                        }

                        function t(e) {
                            document.querySelector(".control-panel").contains(e.target) || (fe(), b.current.blur())
                        }
                        return document.addEventListener("touchstart", t), window.visualViewport.addEventListener("resize", e), () => {
                            window.visualViewport.removeEventListener("resize", e), document.removeEventListener("touchstart", t)
                        }
                    }
                }, []);
                const he = () => {
                        let e = document.getElementById("editable-el-id");
                        if (window.getSelection) {
                            e.focus();
                            let t = window.getSelection();
                            t.selectAllChildren(e), t.collapseToEnd()
                        } else if (document.selection) {
                            let t = document.selection.createRange();
                            t.moveToElementText(e), t.collapse(!1), t.select()
                        }
                    },
                    be = e => {
                        let t = {
                            start: 0,
                            end: 0
                        };
                        try {
                            const i = window.getSelection(),
                                n = i.getRangeAt(0);
                            if ((n.startOffset || n.endOffset) && (n.startOffset && (t.start = n.startOffset), n.endOffset && (t.end = n.endOffset)), v && e) {
                                const z = [].indexOf.call(e.target.childNodes, i.anchorNode);
                                let s = v.split("[").filter(e => "" !== e).map(e => `[${e}`),
                                    A = s.map(e => e.split("]").filter(e => "" !== e).map(e => e.includes("[") ? `${e}]` : e)),
                                    r = [];
                                A.forEach(e => r.push(...e)), r = r.slice(0, z);
                                const o = r.join().replace(/,/g, "").length;
                                if (n.startOffset && (t.start = n.startOffset + o), n.endOffset && (t.end = n.endOffset + o, n.commonAncestorContainer.nodeValue)) {
                                    const e = n.commonAncestorContainer.nodeValue.substring(0, n.endOffset).split("").map(e => e.trim() ? e : "123456").join().replace(/,/g, "").length;
                                    e && (t.end = e + o)
                                }
                            }
                            return t
                        } catch (e) {
                            return console.error("290 error---\x3e", e.message), t
                        }
                    },
                    ve = () => {
                        X(!1), D(!F), V(!1), j(!0), w(!1)
                    },
                    Te = e => {
                        X(!0), T(Ue(e.target.innerHTML));
                        let t = be(e);
                        P(t), j(!0), b.current.onselectstart = function() {
                            return !1
                        }
                    },
                    Re = e => {
                        const t = /\[(.+?)\]/g;
                        let n = [],
                            z = null,
                            s = e;
                        do {
                            z = t.exec(e), z && n.push(z[1])
                        } while (z);
                        n.forEach(e => {
                            try {
                                const t = C[C.map(e => e.key).indexOf(e)],
                                    n = `<img src=${i(134)("./"+t.emoji).default} alt=${t.key} />`;
                                s = s.replace(`[${e}]`, n)
                            } catch (t) {
                                console.log(t)
                            }
                        }), b.current.innerHTML = s
                    },
                    Ue = e => {
                        const t = /alt="(.+?)"/g;
                        let i = [],
                            n = null,
                            z = e;
                        do {
                            n = t.exec(e), n && i.push(n[1])
                        } while (n);
                        return i.forEach(e => {
                            const t = new RegExp("\\<img(.+?)" + e + "(.+?)>");
                            z = z.replace(t, `[${e}]`)
                        }), z
                    };
                const Fe = () => {
                    ne.current || (ne.current = !0, setTimeout(() => {
                        ne.current = !1
                    }, 1e3), De(), j(!0), setTimeout(() => {
                        T("")
                    }, 50), b && b.current && !F && setTimeout(() => {
                        b.current.focus()
                    }, 200), T(null), Re(""), b && b.current && b.current.blur(), F || V(!L))
                };

                function De() {
                    let t = function(e) {
                        let t = null,
                            i = null,
                            n = (e => {
                                if (!e) return "";
                                let t = e;
                                return t = t.replace(/<div>/g, "").replace(/&nbsp;/g, " ").replace(/<\/div>/g, "\n").replace(/<br>/g, "\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/<\/?.+?>/g, "").replace(/ /g, " "), t
                            })(e);
                        if (A === M) {
                            const e = te(c);
                            i = Ve({
                                content: {
                                    text: n,
                                    nickName: e
                                },
                                type: "text"
                            }, e), t = Z({
                                linkId: x,
                                msgData: n,
                                msgType: "chat",
                                isGroup: !0,
                                otherParams: {
                                    nickName: e
                                }
                            })
                        } else i = {
                            msgId: Object(g.a)(),
                            text: n
                        }, t = Z({
                            linkId: x,
                            msgData: i,
                            msgType: "chat",
                            isGroup: !1,
                            otherParams: {
                                toId: a
                            }
                        });
                        return t.msgDataText = e, t.msgDataInfo = i, t.msgId = i.msgId, t.msgWaitState = "loading", t
                    }(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v);
                    h([{
                        ...t,
                        createTime: Date.now()
                    }], U);
                    const i = ji(t.msgDataText, e.prohibitedWordRef.current);
                    if (i.hasProhibited) {
                        let e = xe(i.tipsKey);
                        e === i.tipsKey && (e = i.defaultTips);
                        const t = function(e) {
                            let {
                                text: t,
                                linkId: i,
                                isGroup: n = !1
                            } = e;
                            return K(i, t, n ? yi() : `outroom-${i}`, I)
                        }({
                            text: e,
                            linkId: x,
                            isGroup: A === M
                        });
                        h([t], U)
                    }
                    Be(t)
                }

                function Be(e) {
                    if (function(e) {
                            let t = A === M ? e.msgId : e.ackId;
                            vi[t] = setTimeout(() => {
                                "loading" === e.msgWaitState && (e.msgWaitState = "error", h([{
                                    ...e
                                }], O))
                            }, 6e4)
                        }(e), A === M) z(e.msgDataInfo, Qe);
                    else {
                        let t = Object(H.pick)(e, ["ackId", "dateImType", "dateImTypeData", "msgData", "msgType", "msgVer", "toId"]);
                        z(t, ge)
                    }
                }
                const Le = Object(n.useCallback)((e, t) => {
                    let i = {},
                        n = {};
                    const z = te(c);
                    return A === M ? (i = Ve({
                        content: {
                            duration: t,
                            voiceUrl: e
                        },
                        type: "audio"
                    }, z), n = Z({
                        linkId: x,
                        msgData: i,
                        msgType: "audio",
                        isGroup: !0,
                        otherParams: {
                            nickName: z
                        }
                    })) : (i = {
                        time: t,
                        url: e,
                        msgId: _()
                    }, n = Z({
                        linkId: x,
                        msgData: i,
                        msgType: "audio",
                        isGroup: !1,
                        otherParams: {
                            toId: a
                        }
                    })), n.msgDataText = `<span>${t}"<span/>`, n.msgDataInfo = i, n.msgId = i.msgId, n.url = e, n.voiceUrl = y.audioFileUrl + e, n.audioUrl = y.audioFileUrl + e, n.time = t, n.duration = t, n.msgWaitState = "loading", n
                }, [c]);

                function Ve(e, t) {
                    return {
                        msgId: Object(g.a)(),
                        conversationId: x,
                        contentBody: JSON.stringify([e]),
                        msgSort: +new Date - p,
                        metaData: {
                            nickName: t
                        }
                    }
                }
                const Ie = e => {
                    clearTimeout(vi[e]), delete vi[e];
                    let t = ue.current.find(t => t.msgId === e);
                    t && (t.msgWaitState = "", h([t], O))
                };

                function Qe(e) {
                    Ie(e)
                }
                const Pe = Object(n.useCallback)(() => {
                    u.openControlPermission && !u.joinerHasLiveControlPermission ? (je.get("joiner_cancel_occupy_countdown_" + x) || (je.set("joiner_cancel_occupy_countdown_" + x, 1), Mt.instance.emit("q_joiner_cancel_occupy_countdown_ts", {
                        linkId: x
                    })), k || (m(!0), Mt.instance.emit("cl_control_permission_request_ts", {
                        linkId: x,
                        linkPermissionType: "live_control",
                        operationType: "request"
                    }), Oe({
                        logNo: "S0009",
                        content: JSON.stringify({
                            page_name: "Control Link Open",
                            event_id: "controllinkjs_permission_popup_exposure",
                            event_type: "exposure",
                            element_id: "open_" + x,
                            element_content: "1"
                        }),
                        timeStamp: (new Date).getTime()
                    }))) : (X(!1), D(!1), V(!L), j(!0), w(!1))
                }, [u, L, k]);
                return Object(n.useEffect)(() => {
                    $ || !u.joinerHasLiveControlPermission && !1 !== u.openControlPermission || (J(!0), ee(!0), ae || (X(!1), D(!1), V(!0), j(!0), w(!1), b.current.blur()))
                }, [u, ae, $]), Object(we.jsxs)("div", {
                    className: "chat-operate",
                    children: [d ? Object(we.jsx)(we.Fragment, {
                        children: Object(we.jsxs)("div", {
                            className: "control-panel",
                            children: [Object(we.jsx)("div", {
                                className: "expression",
                                onClick: ve,
                                children: Object(we.jsx)("img", {
                                    src: Rt,
                                    alt: ""
                                })
                            }), Object(we.jsx)("div", {
                                className: "input",
                                children: Object(we.jsx)("div", {
                                    onClick: ke,
                                    className: "inp",
                                    id: "chat-input",
                                    ref: b,
                                    contentEditable: "true",
                                    onInputCapture: Te,
                                    onFocus: Me,
                                    onKeyPress: function(e) {
                                        "Enter" !== e.key && "click" !== e.type || ("Enter" === e.key && e.preventDefault(), Fe())
                                    }
                                })
                            }), Object(we.jsx)("div", {
                                className: "send",
                                onClick: Fe,
                                children: xe("button_send")
                            })]
                        })
                    }) : Object(we.jsxs)(we.Fragment, {
                        children: [Object(we.jsxs)("div", {
                            className: "control-panel",
                            children: [!S && Object(we.jsx)("div", {
                                className: "microphone",
                                onClick: async () => {
                                    if (Y(!q), V(!1), j(!0), F && D(!1), w(!0), !ce.current) try {
                                        let e = new ut.a;
                                        await e.initWithRecord(), e.cancelRecord()
                                    } catch (e) {
                                        console.log("--error: ", e), ye("The browser you are using doesn't support recordIng audio. Open the control link with a different browser to use this feature next time. ", 5e3), w(!1)
                                    }
                                },
                                children: Object(we.jsx)("img", {
                                    src: "data:image/png;base64,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",
                                    alt: ""
                                })
                            }), S && Object(we.jsx)("div", {
                                className: "keyboard",
                                onClick: ke,
                                children: Object(we.jsx)("img", {
                                    src: Tt,
                                    alt: ""
                                })
                            }), Object(we.jsxs)("div", {
                                className: "input",
                                children: [Object(we.jsx)("div", {
                                    className: "inp talk-box",
                                    style: {
                                        display: S ? "block" : "none"
                                    },
                                    onTouchStart: e => {
                                        if (Ee.current) return;
                                        Ee.current = !0;
                                        const t = e.changedTouches[0];
                                        ze.current = t.pageY, se.current = Date.now(), Ae.current = !1, oe(!1), pe("Slide up to cancel.");
                                        let i = new ut.a;
                                        i.initWithRecord().then(() => {
                                            i.startRecord(), Ee.current = !1
                                        }).catch(e => {
                                            ye("Permission to use your microphone is required. Please enable it in your browser.", 5e3), w(!1)
                                        }), ce.current = i, clearTimeout(le.current), le.current = setTimeout(() => {
                                            me("skip")
                                        }, 6e4)
                                    },
                                    onTouchMove: e => {
                                        const t = e.changedTouches[0];
                                        if (ze.current - t.pageY > 100) {
                                            if (Ae.current) return;
                                            Ae.current = !0
                                        } else Ae.current && (Ae.current = !1)
                                    },
                                    onTouchEnd: me,
                                    ref: b
                                }), Object(we.jsx)("div", {
                                    className: "talk-box-text",
                                    style: {
                                        display: S ? "block" : "none"
                                    },
                                    children: "Hold to talk"
                                }), Object(we.jsx)("div", {
                                    id: "editable-el-id",
                                    style: {
                                        display: S ? "none" : "block"
                                    },
                                    onClick: ke,
                                    className: "inp",
                                    ref: b,
                                    contentEditable: "true",
                                    onInputCapture: Te,
                                    onFocus: Me,
                                    onBlur: fe
                                })]
                            }), !F && Object(we.jsx)("div", {
                                className: "expression",
                                onClick: ve,
                                children: Object(we.jsx)("img", {
                                    src: Rt,
                                    alt: ""
                                })
                            }), F && Object(we.jsx)("div", {
                                className: "keyboard",
                                onClick: ke,
                                children: Object(we.jsx)("img", {
                                    src: Tt,
                                    alt: ""
                                })
                            }), (!v || S) && Object(we.jsx)("div", {
                                className: "control",
                                onClick: Pe,
                                children: r ? o === B ? Object(we.jsx)("img", {
                                    src: Ut,
                                    alt: ""
                                }) : Object(we.jsx)("img", {
                                    src: Nt,
                                    alt: ""
                                }) : Object(we.jsx)("img", {
                                    src: "data:image/png;base64,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",
                                    alt: ""
                                })
                            }), !S && v && Object(we.jsx)("div", {
                                className: "send",
                                onClick: Fe,
                                children: Object(we.jsx)("img", {
                                    src: "data:image/png;base64,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",
                                    alt: ""
                                })
                            })]
                        }), Object(we.jsxs)("div", {
                            className: `request-control-popup flex column ${k&&"show"}`,
                            children: [Object(we.jsxs)("div", {
                                className: "request-control-content flex acenter",
                                children: [Object(we.jsx)("img", {
                                    className: "request-control-icon",
                                    src: ui,
                                    alt: ""
                                }), Object(we.jsxs)("div", {
                                    className: "request-control-text",
                                    children: ["Waiting for the other user to respond ", Object(we.jsx)("span", {})]
                                })]
                            }), Object(we.jsx)("div", {
                                className: "request-control-bottom flex",
                                children: Object(we.jsx)("div", {
                                    className: "request-control-btn",
                                    onClick: () => {
                                        m(!1), Mt.instance.emit("cl_control_permission_request_ts", {
                                            linkId: x,
                                            linkPermissionType: "live_control",
                                            operationType: "cancel"
                                        }), h([K(x, "Control request cancelled", `outroom-${x}`, "tips")], U)
                                    },
                                    children: "Cancel"
                                })
                            })]
                        }), ae && Object(we.jsxs)("div", {
                            className: "mic-toast",
                            style: {
                                width: re ? "6.6667rem" : ""
                            },
                            children: [Object(we.jsx)("div", {
                                className: "mic-toast-icon",
                                children: re ? Object(we.jsx)("img", {
                                    className: "waring-icon",
                                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQKADAAQAAAABAAAAQAAAAABGUUKwAAAEZElEQVR4Ae2bu2sUURTGs3k0GvCJhYIiJFGwELHxRUASQcQijY2ChQ9skk4FrVJpIYggNgqCoP4FIoLaCLGz0sRkt7CKjXk0QYso6+8bZy6zs7Mz+5g7u8n1wJc7uXfmnvN9e2fuPM4tdFm2crm8ExfD4AAYBENgG+j3QdG14mOBsgSKYAZ8KBQK3ynXlkH6CHgIZkGrpj7U15GOVoEAN4CboAhsmfqWjw0dIwbB9ICrYB7kZfIlnz1tFYIAxsBX0C6T77HcRcDpAJhqF+sYv4plIBchcDQCFmOCaHeVYhqxKgIOxsFqu5km+Fds45mLQKd94HGC405rUqx99QhRSNvJ7+g1+42m7dth7e+I5ww3UqtJcXUnNfptjyjXGnmFrpgVe/PGrz/RaWO7iXgSrwk1TwEc6Yr6BvQ2L2HqkX/Y4xvYDLan7t3cDr857DSnwvu6D4e85vmlJtSu95Df7HgH6IHIM7YPgo/AhonLQOArtWRn2zc5t+OCwO9GMA1s2FScz6o6POv21qb9ovOaUxRtly06r7ptrpgFcKyHi7tVqmRbUUyZmr5k666it7s+R1NZIQC1l8B+02pnI3FexqUuWrZM3MTRmBEAZfSMPWla1u/GpM/VY2gE4D/Nl3p9td5NHM29QViAK+udeYif4eoJwJDQ+za9sHTFBuF8VGSDEXDBFeYhnufDApwKNbiy6XHuZijoorDPFdYhnvvEXaeAPlq4asMSQF9sXLUDEkCfqly1IQng0vQX/aEHJYA+VLpq2ySAeSnhoAr9/wVw8FevoKwRoOSEPG1rirMtKe1ZNq+0Q4C93IHtSWBxMqEt6yZPgMWse62jv+eIsDG6H3XHqbserbf4/0IvnZfAIYtO4ro+QeUMhO9TfgabwCi4BvJMeihJgCJoh+3G6YN2OA75LOoaMB2qcG1zpsAw1OPwvGvMfb67uv08vDkHBZgTd50Csrf/Cqf+epwDAV46Rf0f2RcqzOdxrgWaDfJ8NF7A3z3wCeju8Cy4CPKwEsO/8j0IAigDMy9Tft+OKFPqzuUUwI2o7y4cK9V1PqcAjlUF4Ffg/5nlGMTRpNoG14AuhsRPYpisFViG9cv4+pjQ36uEtiyaJn2uXl9GAL/np5SzWXhJ6GM5oU1NSyntrTSLmzgaqxAAZZSzc8u02tnQ02DSI+9hO269Xm/5HJNdEKDtFJkncRHgdwf4AWzYVJzP2Dq8206SEsEnwIwEto+BLBZY0E2VKY94II6suQ+INnJAHmlyZfwqTU5CGDGisbT4f+NpcoFDRFBy9Fo3kwwR8GqohP1aSpKO/liP08jWPAWCA+mxj213k6WZNlYR4AyIvXIHQnVYqVhTM8UbjpnRoOTpTl8wMdEwsUYOQAAtmbGZR0z3TZli0sxl33Dk7qKpsLwI4eayuYgI7i6cjAjh5tLZsAjBNqeGjcXTXmJj4COrMvVGqFVHiKHvDsNAyVh6D6f3jrWWz+s7ZQno/aQ+2FhfPv8Xy1Vi7iRqES4AAAAASUVORK5CYII=",
                                    alt: ""
                                }) : Object(we.jsx)("div", {
                                    className: "voice-icon",
                                    children: Object(we.jsx)(Dt, {})
                                })
                            }), Object(we.jsx)("div", {
                                children: ae
                            })]
                        }), q && E && d && Object(we.jsx)(xi.a, {
                            id: "qrCode",
                            value: E,
                            size: 200,
                            fgColor: "#000000",
                            style: {
                                margin: "auto"
                            }
                        }), W && Object(we.jsx)("div", {
                            style: {
                                display: L && !G ? "block" : "none"
                            },
                            children: Object(we.jsx)(di, {
                                renderChatItemAndSendToServer: De,
                                exitChatRoom: s
                            })
                        })]
                    }), Object(we.jsxs)("div", {
                        className: "expression-list",
                        style: {
                            display: F && !G ? "block" : "none"
                        },
                        children: [Object(we.jsx)("ul", {
                            children: C.map(e => Object(we.jsx)("li", {
                                onClick: t => (e => {
                                    X(!1);
                                    const t = `[${e.key}]`;
                                    if (v) {
                                        const e = v.replace(/ /g, "&nbsp;");
                                        let i = e.slice(0, Q.end),
                                            n = e.slice(Q.end);
                                        if (i.includes("[") && !i.split("[").pop().includes("]")) {
                                            let e = n.split("]");
                                            i = i + e[0] + "]", n = n.substring(e[0].length + 1, n.length)
                                        }
                                        const z = `${i}${t}${n}`;
                                        Re(z), T(z)
                                    } else Re(t), T(t);
                                    let i = Q;
                                    i.start = i.start + t.length, i.end = i.end + t.length, P(i), j(!0)
                                })(e),
                                children: Object(we.jsx)("img", {
                                    src: i(134)("./" + e.emoji).default,
                                    alt: e.key
                                })
                            }, e.key))
                        }), Object(we.jsx)("i", {
                            className: "del-chat-text",
                            onClick: () => {
                                if (!v) return;
                                let e = v.trim().slice(0, v.length - 1);
                                Re(e), T(e)
                            }
                        })]
                    })]
                })
            };
        var Ri = Object(n.forwardRef)(Ti);
        i(1114);
        var Ni = () => {
                const [e, t] = Object(n.useState)(!1), i = Se(e => e.isInPc), z = Se(e => e.groupSessionMemberList), s = Se(e => e.user), A = Se(e => e.controlMode), r = Se(e => e.toys), o = Se(e => e.groupSessionMemberToyList), a = Object(n.useCallback)(() => {
                    t(e => !e)
                }, []), p = Object(n.useCallback)(e => {
                    "Enter" !== e.key && " " !== e.key || (e.preventDefault(), a())
                }, [a]), c = Object(n.useRef)({});
                let l = {};
                o.forEach((e, t) => {
                    if (l[e.userId] = e.toyList, 0 === t) l[e.userId] = r.filter(e => "connect" === e.connectStatus);
                    else if (e.toyList) {
                        const t = e.toyList.filter(e => "connect" === e.connectStatus),
                            i = $(t);
                        l[e.userId] = i
                    } else l[e.userId] = []
                }), c.current = l;
                const d = Object(n.useCallback)(e => c.current[e] ? 0 === c.current[e].length ? Object(we.jsx)("span", {
                        className: "member-state",
                        children: "0 Connected"
                    }) : c.current[e].length > 3 ? Object(we.jsxs)("span", {
                        className: "toy-count",
                        children: [c.current[e].length, "toys"]
                    }) : c.current[e].map((e, t) => Object(we.jsx)(bt, {
                        className: "toy-img",
                        toyItem: e
                    }, e.id || t)) : Object(we.jsx)("span", {
                        className: "member-state",
                        children: "0 Connected"
                    }), []),
                    E = Object(n.useCallback)(e => c.current[e] ? c.current[e].length : 0, []),
                    x = Object(we.jsx)("ul", {
                        className: "member-list",
                        children: z.map((e, t) => {
                            return Object(we.jsxs)("li", {
                                className: "member-item",
                                children: [Object(we.jsxs)("div", {
                                    className: "member-left",
                                    children: [Object(we.jsxs)("div", {
                                        className: "member-avatar",
                                        children: [Object(we.jsx)("img", {
                                            src: !0 === e.atControl ? "data:image/png;base64,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" : st,
                                            alt: e.name
                                        }), e.userId === s.userId && Object(we.jsx)("span", {
                                            className: "myself",
                                            children: "Me"
                                        }), !e.onLine && Object(we.jsxs)("div", {
                                            className: "disconnect-mask",
                                            children: [Object(we.jsx)("span", {
                                                className: "dot dot1"
                                            }), Object(we.jsx)("span", {
                                                className: "dot dot2"
                                            }), Object(we.jsx)("span", {
                                                className: "dot dot3"
                                            })]
                                        })]
                                    }), Object(we.jsx)("div", {
                                        className: "member-name",
                                        children: e.nickName
                                    })]
                                }), Object(we.jsx)("div", {
                                    className: "member-right",
                                    children: A === D ? i ? Object(we.jsx)("div", {
                                        className: "toy-state",
                                        children: d(e.userId)
                                    }) : Object(we.jsxs)("div", {
                                        className: "member-state",
                                        children: [E(e.userId), " Toy(s)"]
                                    }) : Object(we.jsx)("div", {
                                        className: "member-state",
                                        children: (n = e, n.onLine ? n.atControl ? "Controlling" : n.beControlled ? "Controlled" : "Wating" : "Disconnect")
                                    })
                                })]
                            }, t);
                            var n
                        })
                    });
                return i ? Object(we.jsxs)("div", {
                    className: "group-members",
                    children: [Object(we.jsx)("div", {
                        className: "title",
                        children: "Group Members"
                    }), x]
                }) : Object(we.jsx)("div", {
                    className: "group-members",
                    children: Object(we.jsxs)("div", {
                        className: e ? "container show-list" : "container",
                        children: [Object(we.jsxs)("div", {
                            className: "title",
                            onClick: a,
                            onKeyDown: p,
                            role: "button",
                            tabIndex: 0,
                            "aria-expanded": e,
                            children: [Object(we.jsx)("span", {
                                children: "Group Members"
                            }), Object(we.jsx)("i", {
                                className: "arrow"
                            })]
                        }), x]
                    })
                })
            },
            Ui = (i(1115), "data:image/png;base64,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");
        var Fi = e => {
            const {
                exitChatRoom: t,
                setEndAndEndType: i
            } = e, n = Se(e => e.chatMode), z = () => {
                window.open("https://www.lovense.com/", "_blank")
            };
            return Object(we.jsx)(we.Fragment, {
                children: Object(we.jsxs)("div", {
                    className: "header",
                    children: [Object(we.jsx)("div", {
                        className: "header-top",
                        children: Object(we.jsx)($t, {
                            setEndAndEndType: i,
                            exitChatRoom: t,
                            LeftComponent: () => Object(we.jsx)("img", {
                                src: Ui,
                                alt: "",
                                className: "header-img",
                                onClick: z
                            })
                        })
                    }), n === M && Object(we.jsx)(Ni, {})]
                })
            })
        };
        i(1116);
        var Oi = e => {
            const {
                content: t,
                handleAgree: i,
                handleDisagree: n,
                showCancel: z = !0
            } = e;
            return Object(we.jsx)("div", {
                className: le() ? "pc-toast-box" : "mobile-toast-box",
                children: Object(we.jsxs)("div", {
                    className: "content",
                    children: [Object(we.jsx)("div", {
                        className: "text-box",
                        children: t
                    }), Object(we.jsx)("div", {
                        className: "btn-box",
                        children: z ? Object(we.jsxs)(we.Fragment, {
                            children: [i && Object(we.jsx)("div", {
                                onClick: i,
                                className: "agree-btn",
                                children: "I'm over 18 and agree"
                            }), n && Object(we.jsx)("div", {
                                onClick: n,
                                className: "exit-btn",
                                children: "Exit"
                            })]
                        }) : Object(we.jsx)(we.Fragment, {
                            children: Object(we.jsx)("div", {
                                onClick: i,
                                className: "okbtn",
                                children: "OK"
                            })
                        })
                    })]
                })
            })
        };
        var Di = () => {
            const e = Se(e => e.groupSessionInfo),
                t = Object(n.useRef)(null),
                i = Se(e => e.update_chatList),
                z = Se(e => e.linkId);
            Object(n.useEffect)(() => {
                const n = t.current;
                if (n && e && "number" === typeof n.eachControlLastsDuration && n.eachControlLastsDuration !== e.eachControlLastsDuration) {
                    const t = xe(e.eachControlLastsDuration);
                    i([K(z, `Control duration changed to ${t}`, yi(), I)], U)
                }
                t.current = e
            }, [e, z])
        };
        var Bi = () => {
            const {
                t: e
            } = Object(Ce.a)(), t = Se(e => e.update_chatList), i = Se(e => e.linkId), z = Se(e => e.groupSessionMemberList), s = Object(n.useRef)(z), A = Se(e => e.chatList), r = Object(n.useRef)(A), o = Object(n.useRef)({}), [a, p] = Object(n.useState)({});
            Se(e => e.groupSessionInfo);
            Object(n.useEffect)(() => {
                s.current = z
            }, [z]), Object(n.useEffect)(() => {
                r.current = A
            }, [A]), Object(n.useEffect)(() => {
                if (!a.status && a.inviteId) {
                    if (r.current.find(e => e.msgType === Q && e.metaData.inviteId === a.inviteId)) return;
                    const n = function(e) {
                        var t;
                        let {
                            invitation: i,
                            linkId: n,
                            groupSessionMemberListStore: z,
                            tips: s
                        } = e;
                        const {
                            groupSessionId: A,
                            inviteId: r,
                            expiredTime: o,
                            status: a,
                            fromUserId: p
                        } = i, c = (null === (t = z.find(e => e.userId === p)) || void 0 === t ? void 0 : t.nickName) || "", l = Z({
                            linkId: n,
                            msgData: {
                                tips: s || "I started an invitation, the first to tap will become the new controllee."
                            },
                            msgType: Q,
                            isGroup: !0,
                            otherParams: {
                                tipId: yi(),
                                msgId: _(),
                                metaData: {
                                    nickName: c,
                                    groupSessionId: A,
                                    inviteId: r,
                                    expiredTime: o,
                                    status: a,
                                    fromUserId: p
                                }
                            }
                        });
                        return l
                    }({
                        invitation: a,
                        linkId: i,
                        groupSessionMemberListStore: s.current,
                        tips: e("gcl_change_controllee_invitation") || "I started an invitation, the first to tap will become the new controllee."
                    });
                    t([n], U);
                    Oe({
                        logNo: "S0009",
                        content: JSON.stringify({
                            page_name: "group_link_chat",
                            event_id: "control_link_DS_change_system_msg_send",
                            event_type: "exposure",
                            element_id: i,
                            element_type: "controller",
                            element_name: "1",
                            toys: []
                        }),
                        timeStamp: (new Date).getTime()
                    })
                }
            }, [a]), Object(n.useEffect)(() => {
                if (a.status && (a.status === G || a.status === P)) {
                    const e = r.current.find(e => e.msgType === Q && e.metaData && e.metaData && e.metaData.inviteId === a.inviteId);
                    if (e) {
                        const i = {
                            ...e,
                            otherParams: {
                                ...e.otherParams,
                                metaData: {
                                    ...e.metaData,
                                    status: a.status
                                }
                            },
                            metaData: {
                                ...e.metaData,
                                status: a.status
                            }
                        };
                        t([i], O)
                    }
                }
            }, [a.status]);
            const c = Object(n.useRef)(null);
            return Object(n.useEffect)(() => {
                var n;
                const s = z.find(e => e.beControlled);
                if (s && c.current && s.userId !== (null === (n = c.current) || void 0 === n ? void 0 : n.userId)) {
                    const n = e("gcl_new_controllee_tip").replace("<#1#>", s.nickName) || `${s.nickName} become the new controllee`;
                    t([K(i, n, yi(), I)], U)
                }
                c.current = s
            }, [z]), {
                setInvitationDetail: p,
                invitationRef: o
            }
        };

        function Si(e, t) {
            if (e.length !== t.length) return !1;
            const i = e.map(e => e.id),
                n = t.map(e => e.id);
            return !!i.every(i => {
                const z = e.find(e => e.id === i),
                    s = t.find(e => e.id === i);
                return n.includes(i) && z.connectStatus === s.connectStatus
            })
        }
        i(1117);
        const Ci = {
            google: "https://play.google.com/store/apps/details?id=com.lovense.wear",
            appstore: "https://apps.apple.com/us/app/lovense-remote/id1027312824",
            windows: "https://www.lovense.com/files/apps/remote/remote.exe",
            mac: "https://www.lovense.com/files/apps/remote/remote.dmg"
        };
        var wi = e => (Object(n.useEffect)(() => {
            Re().then(e => {
                var t, i;
                e.result && null !== (t = e.data) && void 0 !== t && null !== (i = t.list) && void 0 !== i && i.length && e.data.list.forEach(e => {
                    e.platform && e.url && (Ci[e.platform] = e.url)
                })
            })
        }, []), Object(we.jsx)("div", {
            className: "download-remote-top",
            children: Object(we.jsxs)("div", {
                className: "download-remote-content flex between",
                children: [Object(we.jsxs)("div", {
                    className: "download-remote-left flex acenter",
                    children: [Object(we.jsx)("img", {
                        className: "logo",
                        src: Xe,
                        alt: "Lovense Remote"
                    }), Object(we.jsx)("div", {
                        children: "Lovense Remote"
                    })]
                }), Object(we.jsxs)("div", {
                    className: "download-remote-right flex acenter",
                    children: [Object(we.jsx)("a", {
                        href: Ci.google,
                        target: "_blank",
                        rel: "noreferrer",
                        children: Object(we.jsx)("img", {
                            src: He,
                            alt: "Google Play"
                        })
                    }), Object(we.jsx)("a", {
                        href: Ci.appstore,
                        target: "_blank",
                        rel: "noreferrer",
                        children: Object(we.jsx)("img", {
                            src: Ke,
                            alt: "App Store"
                        })
                    }), Object(we.jsx)("a", {
                        href: Ci.windows,
                        target: "_blank",
                        rel: "noreferrer",
                        children: Object(we.jsx)("img", {
                            src: Ze,
                            alt: "Windows"
                        })
                    }), Object(we.jsx)("a", {
                        href: Ci.mac,
                        target: "_blank",
                        rel: "noreferrer",
                        children: Object(we.jsx)("img", {
                            src: _e,
                            alt: "Mac"
                        })
                    })]
                })]
            })
        }));
        i(1118);
        var Li = e => {
            let {
                text: t,
                className: i = ""
            } = e;
            const n = de();
            return Object(we.jsxs)("div", {
                className: `bubble-tips ${i} ${n?"pc-bubble-tips":""}`,
                children: [Object(we.jsx)("div", {
                    className: "bubble-content",
                    children: Object(we.jsx)("p", {
                        className: "bubble-text",
                        children: t || "Open in Lovense Remote App to connect a toy and act as the controllee in D&S Control"
                    })
                }), Object(we.jsx)("div", {
                    className: "bubble-arrow",
                    children: Object(we.jsx)("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "8",
                        viewBox: "0 0 16 8",
                        fill: "none",
                        children: Object(we.jsx)("path", {
                            d: "M6.58579 1.41421C7.36684 0.633164 8.63317 0.633165 9.41421 1.41421L16 8L0 8L6.58579 1.41421Z",
                            fill: "white"
                        })
                    })
                })]
            })
        };
        i(1119);
        var Vi = e => {
            const {
                show: t,
                onClose: i
            } = e, n = de(), z = Object(we.jsxs)("div", {
                className: "mobile-content",
                children: [Object(we.jsx)("div", {
                    className: "out-line-box"
                }), Object(we.jsx)("div", {
                    className: "bubble-box",
                    children: Object(we.jsx)(Li, {})
                })]
            }), s = Object(we.jsxs)("div", {
                className: "pc-content",
                children: [Object(we.jsx)("div", {
                    className: "out-line-box"
                }), Object(we.jsx)("div", {
                    className: "bubble-box",
                    children: Object(we.jsx)(Li, {})
                })]
            });
            return Object(we.jsxs)("div", {
                className: "accept-control-invitation-tips",
                style: {
                    display: t ? "flex" : "none"
                },
                onClick: () => {
                    i()
                },
                children: [n ? Object(we.jsx)("div", {
                    className: "pc-cover-box cover-box"
                }) : null, n ? s : z]
            })
        };
        i(1120);
        const Ii = de(),
            Qi = ce();
        let Pi = null,
            Gi = null;
        const Xi = new Mt;
        let qi = () => {
                new Error("\u8bf7\u8d4b\u503c\u6210\u529f\u56de\u8c03\u51fd\u6570")
            },
            Yi = () => {},
            Wi = "",
            Ji = [],
            Hi = "",
            Ki = !1;
        var Zi = e => {
                const t = e.match.params.code,
                    i = /\/gcls\//i.test(e.match.url) ? M : m,
                    z = window.location.href.includes("/t2/"),
                    s = Se(e => e.linkId),
                    A = Se(e => e.isEnd),
                    r = Se(e => e.chatList),
                    o = Se(e => e.creatorId),
                    a = Se(e => e.update_chatCode),
                    p = Se(e => e.update_chatMode),
                    c = Se(e => e.update_countryCode),
                    l = Se(e => e.update_linkId),
                    d = Se(e => e.update_qrCode),
                    E = Se(e => e.update_isEnd),
                    x = Se(e => e.update_isInPc),
                    u = Se(e => e.update_isRequestingControl),
                    T = Se(e => e.update_groupSessionMemberToyList),
                    R = Se(e => e.update_controlLinkInfo),
                    N = Se(e => e.update_groupSessionMemberList),
                    O = Se(e => e.update_toys),
                    C = Se(e => e.update_controlPermission),
                    Q = Se(e => e.update_groupSessionInfo),
                    P = Se(e => e.update_user),
                    G = Se(e => e.update_fromCam),
                    X = Se(e => e.update_controlState),
                    q = Se(e => e.update_creatorId),
                    W = Se(e => e.update_timestampDiff),
                    _ = Se(e => e.update_chatList),
                    [ie, ne] = Object(n.useState)(!0),
                    [ze, se] = Object(n.useState)(!1),
                    [Ae, oe] = Object(n.useState)(""),
                    [ae, pe] = Object(n.useState)(!1),
                    [ce, le] = Object(n.useState)(""),
                    [de, Ee] = Object(n.useState)(""),
                    [ge, ye] = Object(n.useState)({
                        remoteGeneralTerms: "https://hyttoapps.bandnana.com/remote/terms-and-conditions",
                        termsAndConditions: "https://hyttoapps.bandnana.com/remote/control-link-tc"
                    }),
                    [me, Me] = Object(n.useState)(""),
                    [fe, be] = Object(n.useState)(""),
                    [ve, Re] = Object(n.useState)(!1),
                    [Ne, Ue] = Object(n.useState)(!1),
                    Fe = Object(n.useRef)(null),
                    De = Object(n.useRef)(!0),
                    Be = Object(n.useRef)(!1),
                    Ve = Object(n.useRef)(B),
                    Qe = i === m ? w : L;
                Ji = r, Hi = s, Ki = A, Wi = o, mi(), Di();
                const {
                    setInvitationDetail: Pe,
                    invitationRef: Ge
                } = Bi(), Xe = Se(e => e.groupSessionMemberList), qe = Object(n.useRef)(Xe), Ye = Se(e => e.toys), We = Object(n.useRef)(Ye), He = Se(e => e.controlLinkInfo), Ke = Object(n.useRef)(He), Ze = Se(e => e.groupSessionMemberToyList), _e = Object(n.useRef)(Ze);
                Object(n.useEffect)(() => {
                    qe.current = Xe
                }, [Xe]), Object(n.useEffect)(() => {
                    We.current = Ye
                }, [Ye]), Object(n.useEffect)(() => {
                    Ke.current = He
                }, [He]), Object(n.useEffect)(() => {
                    _e.current = Ze
                }, [Ze]);
                const {
                    prohibitedWordRef: $e
                } = bi(), {
                    t: et
                } = Object(Ce.a)(), it = function() {
                    (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && he.set(`taptip_${t}`, !0), pe(!1)
                }, nt = async () => {
                    window.location.href = function(e) {
                        let t = `${e}?returnFromAppStore=1&source=${ue("source")}&share_type=${ue("share_type")}`;
                        t = Qi ? `${t}&platform=android` : `${t}&platform=ios`;
                        const i = encodeURIComponent(t);
                        return Qi ? `${y.androidLandUrl}/r/evokeApp.html?control_link_url=${e}&time=3000&browser_fallback_url=${i}` : `${y.iosLandUrl}/r/evokeApp.html?control_link_url=${e}&time=5000&browser_fallback_url=${i}`
                    }(`${window.location.origin}${window.location.pathname}`)
                };
                async function zt() {
                    let e = await k.get(y.reportUrl + "/api/h5_common_base_data").catch(e => {
                        const t = he.get("commonBaseData");
                        return t && (c(t.countryCode), ye(t.controlLinkTerms)), Promise.reject(e)
                    });
                    e && e.result && (c(e.data.countryCode), ye(e.data.controlLinkTerms), he.set("commonBaseData", e.data))
                }

                function st() {
                    _([K(Hi, {
                        title: "Current Control Option: Orgy Control",
                        content: "Control everyone's toys by sending messages with Orgy keywords set by the creator. The more you send, the longer the vibration will last.",
                        controlMode: D
                    }, `orgytips-${Hi}`, "orgytips", !0)], U)
                }

                function At() {
                    _([K(Hi, {
                        title: "Current Control Option: D&S Control",
                        content: "Participants line up to control the creator's toy(s) in the order they joined the chat",
                        controlMode: B
                    }, `orgytips-${Hi}`, "orgytips", !0)], U)
                }
                async function rt(e, i) {
                    let n = await (z = {
                        groupSessionId: e
                    }, k.post(y.reportUrl + "/control_link_group/get_session_info", z));
                    var z;
                    if (n.result) {
                        pt();
                        const {
                            controlLinkInfo: z,
                            groupSessionMemberList: s,
                            groupSessionInfo: A,
                            groupSessionMemberToyList: r
                        } = n.data, o = (e => {
                            const {
                                groupSessionInfo: t,
                                controlLinkInfo: i
                            } = e;
                            let n = "";
                            return i.duration > 0 ? n = xe(i.duration) : i.duration < 0 && !t.startControl && (n = "00:00"), {
                                ...i,
                                linkDesc: i.description,
                                expires: i.duration,
                                tags: i.tagList,
                                longTimeControlLinkUrl: i.linkUrl,
                                isStart: t.startControl,
                                leftControlTime: i.duration,
                                leftControlTimeText: n
                            }
                        })(n.data);
                        ee(s), R(o), N(s), T(r), Q(A);
                        const a = s.find(e => e.userId === i);
                        P(a);
                        let p = $(z.toyList);
                        const c = s.find(e => !0 === e.beControlled);
                        if (c && "sub" !== c.controlRole) {
                            const e = r.find(e => e.userId === c.userId) || [];
                            e && e.toyList && (p = $(e.toyList.filter(e => "connect" === e.connectStatus)))
                        }
                        O(p);
                        let l = Vt({
                            creator: {
                                toys: $(z.toyList)
                            },
                            link: o,
                            linkId: e
                        });
                        const d = he.get(`chatList_${t}`, []);
                        ne(!1), 0 === d.length ? (_([l], F), function(e) {
                            setTimeout(() => {
                                ot(`I'm ${te(e)} of this control link, nice to meet you!`)
                            }, 500)
                        }(a), A.controlMode === D ? st() : z.supportedControlMode.includes("orgy") && At(), Ve.current = A.controlMode) : _([...d], F)
                    }
                }

                function ot(e) {
                    Fe.current.renderChatItemAndSendToServer(e)
                }
                async function at() {
                    let e = await (i = {
                        shortCode: t
                    }, k.post(y.reportUrl + "/control_link_group/join_session", i));
                    var i;
                    if (e.result && e.data) {
                        const {
                            joinStatus: t
                        } = e.data;
                        if ("join_ok" === t) {
                            const {
                                groupSessionId: t,
                                userId: i,
                                webSocketInfo: n,
                                qrCode: z
                            } = e.data;
                            rt(t, i), dt(n, t), P({
                                userId: i
                            }), l(t), d(z)
                        } else Dt(t)
                    } else Bt({
                        end: !0,
                        endType: "valid"
                    })
                }
                const pt = async () => {
                    let e = await k.get(y.reportUrl + "/api/server/timestamp");
                    if (e.result) {
                        const t = e.data;
                        W(+new Date - t)
                    }
                };
                async function ct() {
                    let e = await k.post(y.reportUrl + "/control_link_group/im/get_undelivered_msg", t);
                    var t;
                    0 === e.code && lt(e.data)
                }
                const lt = async e => {
                    let {
                        msgList: t = [],
                        hasNextPage: i = !1
                    } = e;
                    _(t, U);
                    try {
                        const e = hi(t.map(e => {
                            const t = e.contentBody || e.msgDataInfo.contentBody;
                            if (t) try {
                                const e = JSON.parse(t);
                                if (e.length) {
                                    const t = e[0];
                                    if ("text" === t.type) return t.content.text
                                }
                            } catch (i) {}
                            return ""
                        }), $e.current);
                        if (e.hasProhibited) {
                            let t = et(e.tipsKey);
                            t === e.tipsKey && (t = e.defaultTips), _([K(Hi, t, `outroom-${Hi}`, I)], U)
                        }
                    } catch (s) {}
                    const n = t.map(e => e.msgId);
                    var z;
                    await (z = {
                        msgIdList: n
                    }, k.post(y.reportUrl + "/control_link_group/im/confirm_deliver_msg", z)), i && ct()
                }, dt = (e, t) => {
                    Xi.initSocket(e.wsUrl, e.socketIoPath);
                    const i = Xi._events;
                    Xi.on("connect", () => {
                        setInterval(() => {
                            Xi.emit("gcls_group_control_session_heartbeat_ts", {
                                groupSessionId: t
                            })
                        }, 6e3)
                    }), i.gcls_group_control_link_group_session_info_tc || Xi.on("gcls_group_control_link_group_session_info_tc", e => {
                        const {
                            groupSessionInfo: t
                        } = e;
                        Q(t), "end" === t.sessionStatus && Bt({
                            end: !0,
                            endType: "time_up"
                        });
                        let {
                            controlMode: i
                        } = t;
                        Ve.current !== i && (i === D ? st() : At(), Ve.current = i)
                    }), i.gcls_group_control_link_control_link_info_tc || Xi.on("gcls_group_control_link_control_link_info_tc", e => {
                        var t;
                        const {
                            controlLinkInfo: i,
                            groupSessionMemberList: n
                        } = e;
                        n && ee(n), R(i);
                        let z = null === (t = qe.current) || void 0 === t ? void 0 : t.find(e => e.beControlled),
                            s = [];
                        if (z)
                            if ("sub" !== z.controlRole) {
                                var A;
                                const e = null === (A = _e.current) || void 0 === A ? void 0 : A.find(e => e.userId === z.userId);
                                e && e.toyList && (s = $(e.toyList))
                            } else s = $(Ke.current.toyList);
                        Si(s, We.current) || O(s)
                    }), i.you_were_removed_from_gcls_group_control_tc || Xi.on("you_were_removed_from_gcls_group_control_tc", () => {
                        Bt({
                            end: !0,
                            endType: "time_up"
                        })
                    }), i.gcls_group_control_link_upgrade_to_app_tc || Xi.on("gcls_group_control_link_upgrade_to_app_tc", () => {
                        Bt({
                            end: !0,
                            endType: "time_up"
                        })
                    }), i.gcls_group_control_im_msg_list_tc || Xi.on("gcls_group_control_im_msg_list_tc", lt), i.gcls_group_control_im_exist_unconfirmed_msg_tc || Xi.on("gcls_group_control_im_exist_unconfirmed_msg_tc", ct), i.gcls_group_control_link_group_session_member_list_tc || Xi.on("gcls_group_control_link_group_session_member_list_tc", e => {
                        const {
                            groupSessionId: i,
                            groupSessionMemberList: n
                        } = e;
                        ee(n), t === i && N(n)
                    }), i.gcls_group_control_link_group_session_member_toy_list_tc || Xi.on("gcls_group_control_link_group_session_member_toy_list_tc", e => {
                        var t;
                        const {
                            groupSessionMemberToyList: i
                        } = e;
                        T(i);
                        const n = null === (t = qe.current) || void 0 === t ? void 0 : t.find(e => e.beControlled);
                        let z = [];
                        if (n)
                            if ("sub" !== n.controlRole) {
                                const e = i.find(e => e.userId === n.userId);
                                e && e.toyList && (z = $(e.toyList))
                            } else z = $(Ke.current.toyList);
                        Si(z, We.current) || O(z)
                    }), i.invite_controllee_start_tc || Xi.on("invite_controllee_start_tc", e => {
                        Pe(e), Ge.current = e
                    }), i.invite_controllee_status_change_tc || Xi.on("invite_controllee_status_change_tc", e => {
                        const t = {
                            ...Ge.current,
                            status: e.status
                        };
                        Pe(t), Ge.current = t
                    })
                };

                function Et(e, t) {
                    const {
                        linkId: i,
                        joinerFirstTime: n,
                        creator: z,
                        linkStatus: s
                    } = t;
                    let {
                        wsServerUrl: A,
                        socketIoPath: r
                    } = e;
                    Xi.initSocket(A, r), Xi.on("connect", () => {
                        Xi.emit("anon_open_control_panel_ts", {
                            linkId: i
                        }), jt(i, s), n ? function(e, t, i) {
                            const n = {
                                    controlLinkData: JSON.stringify(t)
                                },
                                z = Z({
                                    linkId: e,
                                    msgData: n,
                                    msgType: "controllink",
                                    isGroup: !1,
                                    otherParams: {
                                        toId: i
                                    }
                                });
                            Xt(Object(H.pick)(z, ["ackId", "dateImType", "dateImTypeData", "msgData", "msgType", "msgVer", "toId"]), () => {})
                        }(i, t, z.userId) : Xi.emit("q_get_user_new_msg_list_ts", {
                            dateImTypeData: i,
                            msgId: ""
                        })
                    });
                    const o = Xi._events;
                    o.cl_control_permission_response_tc || Xi.on("cl_control_permission_response_tc", Mt), o.anon_you_must_refresh_control_link_tc || Xi.on("anon_you_must_refresh_control_link_tc", e => {
                        let {
                            linkId: t,
                            linkStatus: i
                        } = e;
                        jt(t, i)
                    }), o.con_query_control_info_tc || Xi.on("con_query_control_info_tc", ft), o.ack_query_user_on_line_info_tc || Xi.on("ack_query_user_on_line_info_tc", Ut), o.q_you_must_refresh_control_link_tc || Xi.on("q_you_must_refresh_control_link_tc", Ot), o.anon_query_control_info_tc || Xi.on("anon_query_control_info_tc", Lt), o.q_ack_send_im_msg_tc || Xi.on("q_ack_send_im_msg_tc", e => {
                        qi(e)
                    }), o.q_ack_user_new_msg_list_tc || Xi.on("q_ack_user_new_msg_list_tc", yt), o.q_you_have_some_new_im_msg_tc || Xi.on("q_you_have_some_new_im_msg_tc", kt), o.anon_link_is_end_tc || Xi.on("anon_link_is_end_tc", gt), o.anon_notify_break_control_tc || Xi.on("anon_notify_break_control_tc", xt), o.gcls_group_control_link_group_session_info_tc || Xi.on("q_refresh_occupy_countdown_tc", ut), o.gcls_group_control_link_group_session_info_tc || Xi.on("which_app_page_open_now_tc", e => {
                        let t = {
                            pepsiId: e.pepsiId,
                            webPage: "control_link"
                        };
                        Xi.emit("app_open_this_page_now_ts", t)
                    })
                }
                const xt = e => {
                        const {
                            linkStatus: t
                        } = e;
                        t && Yt()
                    },
                    ut = e => {
                        try {
                            if ("true" === `${e.reachMaxAbnormalCount}` && Yt("reachMax"), "-1" === `${e.remainTime}`) return Yt("over");
                            Yt("start", e.remainTime)
                        } catch (t) {
                            Yt("over")
                        }
                    },
                    gt = e => {
                        try {
                            if (Xi.disconnect(), "true" === `${e.controllerBanned}`) return void Yt(`ban-${e.timeUnit}-${e.banTime}`);
                            Yt(e.endType), clearTimeout(Pi), Yi && Yi()
                        } catch (t) {
                            Yt()
                        }
                    },
                    kt = () => {
                        Xi.emit("q_get_user_new_msg_list_ts", {
                            dateImTypeData: Hi,
                            msgId: ze || ""
                        })
                    },
                    yt = e => {
                        let {
                            list: t
                        } = e;
                        if (t.length > 0) {
                            const e = t[t.length - 1].msgId;
                            Xi.emit("q_deliver_im_msg_ts", {
                                msgId: e
                            }), se(e)
                        }
                        _(t, U);
                        const i = hi(t.filter(e => "chat" === e.msgType).map(e => e.msgData), $e.current);
                        if (i.hasProhibited) {
                            let e = et(i.tipsKey);
                            e === i.tipsKey && (e = i.defaultTips), _([K(Hi, e, `outroom-${Hi}`, I)], U)
                        }
                    },
                    mt = Object(n.useRef)(Date.now()),
                    Mt = e => {
                        u(!1);
                        const {
                            operationType: t
                        } = e;
                        if ("accept" === t) C({
                            joinerHasLiveControlPermission: !0,
                            openControlPermission: !0
                        });
                        else if (Ii) {
                            const e = {
                                decline: "declined",
                                expired: "has expired"
                            };
                            e[t] && _([K(Hi, `Control request ${e[t]}`, `outroom-${Hi}`, "tips")], U)
                        } else "decline" === t ? _([K(Hi, "Control request declined", `outroom-${Hi}`, "tips")], U) : "expired" === t && (Date.now() - mt.current > 6e4 ? _([K(Hi, "Control request has expired", `outroom-${Hi}`, "tips")], U) : mt.current = Date.now());
                        Oe({
                            logNo: "S0009",
                            content: JSON.stringify({
                                page_name: "Control Link Open",
                                event_id: "controllinkjs_permission_popup_disappear",
                                event_type: "click",
                                element_id: "open_" + Hi,
                                element_content: {
                                    accept: "4",
                                    decline: "3",
                                    expired: "2"
                                } [t]
                            }),
                            timeStamp: (new Date).getTime()
                        })
                    },
                    ft = e => {
                        Lt(e, () => {
                            if (e.link.isStart + "" === "true") {
                                let t = {
                                    version: 1,
                                    linkId: e.linkId,
                                    event: "controllinkDidStart",
                                    message: ""
                                };
                                ke(JSON.stringify(t))
                            }
                        })
                    };
                const jt = (e, t) => {
                        It(e), setTimeout(() => {
                            It(e)
                        }, 1e3), setTimeout(() => {
                            It(e)
                        }, 2e3), clearInterval(Gi), Gi = setInterval(() => {
                            It(e), t === j && clearInterval(Gi)
                        }, 5e3)
                    },
                    bt = 0,
                    Tt = 1,
                    Rt = 2,
                    Nt = Object(n.useRef)(bt),
                    Ut = e => {
                        (e => {
                            let t = e ? "reconnected" : "disconnected";
                            const i = K(Hi, `The other user is ${t}.`, `${t}-${Wi}`);
                            e ? (Nt.current === Tt && _([i], U), Nt.current = Rt) : (Nt.current === Rt && _([i], U), Nt.current = Tt)
                        })(e.onLine), Ft(e)
                    };
                let Ft = e => {
                    var t, i;
                    if (!e.appPage) return;
                    "control_link" === e.appPage ? Be.current = !1 : Be.current || (Be.current = !0);
                    const n = Ji.filter(e => "roomtips" === e.msgType),
                        z = null === (t = n[n.length - 1]) || void 0 === t ? void 0 : t.tipId.includes("outroom-"),
                        s = null === (i = n[n.length - 1]) || void 0 === i ? void 0 : i.tipId.includes("joinroom-");
                    z || Be.current || "control_link" === e.appPage || !s ? "control_link" === e.appPage && (Be.current = !1, s || _([K(Hi, "The other user joined the room.", `joinroom-${Hi}`, "roomtips")], U)) : (Be.current = !0, _([K(Hi, "The other user is left this room. You can still control their toy(s).", `outroom-${Hi}`, "roomtips")], U))
                };
                const Ot = e => {
                    try {
                        let t = e.linkId,
                            i = {
                                ackId: Object(g.a)(),
                                linkId: t
                            };
                        Xi.emit("anon_query_control_info_ts", i)
                    } catch (t) {
                        console.error("388 error--\x3e", t.message, e)
                    }
                };
                const Dt = e => "join_ok" !== e && ("member_limit" === e ? Bt({
                    end: !0,
                    endType: "full"
                }) : "ip_blocked" === e ? Ee("isBanPage") : "another_playing" === e ? Ee("isAnotherPlaying") : "removed" === e ? Bt({
                    end: !0,
                    endType: "expired"
                }) : "link_invalid" === e || "link_expired" === e ? Bt({
                    end: !0,
                    endType: "valid"
                }) : "time_up" === e ? Bt({
                    end: !0,
                    endType: "time_up"
                }) : "link_error" === e ? Bt({
                    end: !0,
                    endType: "valid"
                }) : "user_banned" === e && Bt({
                    end: !0,
                    endType: "user_banned"
                }), !0);

                function Bt(e) {
                    E(e.end), le(e.endType)
                }

                function St() {
                    k.post(y.reportUrl + "/api/remote/task-center/goods/emoji-bag", {
                        emojiListVersion: 0,
                        platform: "control_link",
                        appVersion: "1"
                    }).then(e => {
                        if (e.result) {
                            let t = e.data.list || [];
                            for (let e = 0; e < t.length; e++) {
                                let i = t[e];
                                i.items.forEach(e => {
                                    e.type = i.emojiType, V.push(e)
                                })
                            }
                        }
                    })
                }
                const Ct = async e => {
                    let i = await (n = {
                        shortCode: t
                    }, k.post(y.reportUrl + "/api/remote/control/link/check", n));
                    var n;
                    if (i.data && i.data.status) return e(i.data.status);
                    e(!1)
                };
                async function wt() {
                    let e = "";
                    e = z ? await new Promise(async e => {
                        const i = he.get("anonKey"),
                            n = new FormData;
                        n.append("shortCode", t), i && n.append("anonKey", i);
                        let z = await (s = n, k.post(y.baseUrl + "/anon/longtimecontrollink/init", s)).catch(() => {
                            Ee("default"), ne(!1)
                        });
                        var s;
                        if (0 === z.code) {
                            const {
                                data: t
                            } = z;
                            e(t.id), t.anonKey && he.set("anonKey", t.anonKey), je.set("shareTophy", !!t.shareTophy)
                        } else ne(!1), Pt(z)
                    }) : t;
                    let i = await
                    function(e) {
                        return new Promise((t, i) => {
                            const n = new FormData;
                            var z;
                            n.append("id", e), n.append("historyUrl", document.referrer), (z = n, k.post(y.baseUrl + "/anon/controllink/status", z)).then(e => {
                                t(e)
                            }).catch(() => {
                                Ee("default"), i()
                            })
                        })
                    }(e);
                    if (0 === i.code) {
                        let i = await
                        function(e) {
                            return new Promise(t => {
                                const i = new FormData;
                                i.append("id", e), i.append("historyUrl", document.referrer);
                                const n = ue("referer_channel");
                                n && i.append("refererChannel", n),
                                    function(e) {
                                        const t = re();
                                        return k.post(y.baseUrl + "/anon/controllink/join", e, {
                                            headers: {
                                                "Content-Type": "application/json; charset=utf-8",
                                                "anon-uuid": t
                                            }
                                        })
                                    }(i).then(e => {
                                        t(e)
                                    }, () => {
                                        Ee("default"), ne(!1)
                                    })
                            })
                        }(e);
                        if (i.result) {
                            if (i.data.anotherPlaying) return void Ee("isAnotherPlaying");
                            const {
                                controlLinkData: e
                            } = i.data, {
                                linkStatus: n,
                                linkId: z,
                                joinerFirstTime: s
                            } = e;
                            let {
                                x: A,
                                y: r
                            } = e;
                            if (Y.setDynamicKeyValue(A, r), l(z), Ii || (function(e) {
                                    window.lvsStatus = () => !Boolean(document.querySelector(".end-chat")), window.lvsClose = () => !document.querySelector(".end-chat") && (Jt(e), !0)
                                }(z), function(e) {
                                    const {
                                        linkId: t,
                                        controlPermission: i
                                    } = e, n = i && i.openControlPermission;
                                    if (!je.get(t + "linkId-log-flag")) {
                                        let e = "2";
                                        /Tophy|tophy/i.test(navigator.userAgent) && (e = "1"), Oe({
                                            logNo: "S0009",
                                            content: JSON.stringify({
                                                page_name: "Control Link Open",
                                                event_id: "control_link_open",
                                                event_type: "open",
                                                element_id: "open_" + t,
                                                element_type: e,
                                                element_content: je.get("shareTophy") ? "1" : "2",
                                                element_name: n ? "1" : "2",
                                                element_name: "2",
                                                duration: "",
                                                toys: ""
                                            }),
                                            timeStamp: (new Date).getTime()
                                        }), je.set(t + "linkId-log-flag", "1")
                                    }
                                }(e)), n === f) {
                                const {
                                    socketIoPath: n,
                                    wsUrl: A,
                                    qrCode: r,
                                    fromCam: o
                                } = i.data;
                                if (Et({
                                        wsServerUrl: A,
                                        socketIoPath: n
                                    }, e), Lt(e), s) {
                                    let t = Vt(e);
                                    _([t], F)
                                } else {
                                    const e = he.get(`chatList_${t}`, []);
                                    _([...e], F)
                                }
                                G(o || !1), d(r), qt(z)
                            } else Bt({
                                end: !0,
                                endType: ""
                            })
                        } else Ee("default")
                    } else Pt(i);
                    ne(!1)
                }

                function Lt(e, t) {
                    let {
                        creator: n,
                        linkStatus: z,
                        punishment: s,
                        link: A,
                        controlPermission: r
                    } = e;
                    if (C(r || {
                            openControlPermission: !1
                        }), n) {
                        const t = function() {
                            const e = [];
                            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(t => {
                                let i = (t.toyFun || "v").split(",");
                                if (i.includes("v") && i.includes("v1")) {
                                    const e = i.indexOf("v");
                                    i.splice(e, 1)
                                } ["tenera", "q01"].includes(t.type.toLowerCase()) && (i = ["s"], t.type = "tenera"), ["fizz", "qb"].includes(t.type.toLowerCase()) && (i = ["s"], t.type = "fizz"), "flexer" === t.type.toLowerCase() && (i = ["v", "f"]), "gravity" === t.type.toLowerCase() && (i = ["v", "t"]), "xmachine" !== t.type.toLowerCase() && "mini xmachine" !== t.type.toLowerCase() || (i = ["t"]), "solace pro" === t.type.toLowerCase() && (i = "speed" === t.workMode ? ["t"] : ["pos"]), "spinel" === t.type.toLowerCase() && (i = "thrusting" === t.workMode ? ["t"] : ["v", "t"]);
                                let n = [];
                                J.forEach(e => {
                                    i.includes(e) && n.push(e)
                                }), t.toyFun = n.join(","), e.push(t)
                            }), e
                        }(n.toys);
                        O(t), e.toysName = function(e) {
                            if (e && e.length > 1) {
                                let t = [];
                                for (const i of e) {
                                    let e = S[(i.type + "").toLowerCase()];
                                    e || (e = i.type);
                                    let n = i.version;
                                    "1" == n && (n = ""), n ? t.push(e + " " + n) : t.push(e)
                                }
                                return t.join(",")
                            }
                            return ""
                        }(t), q(n.userId)
                    }
                    if (A) {
                        A.expires > 0 ? A.leftControlTimeText = xe(A.leftControlTime) : A.expires < 0 && !A.isStart && (A.leftControlTimeText = "00:00"), R(A);
                        let e = A.isStart ? b : h;
                        z !== f && (e = v), X(e)
                    }
                    if (i === M) {
                        if (z !== f) {
                            if ("true" === `${s.controllerBanned}`) return void Bt({
                                end: !0,
                                endType: `ban-${s.timeUnit}-${s.banTime}`
                            });
                            Bt({
                                end: !0,
                                endType: "valid"
                            })
                        }
                    } else if (z === j) {
                        if ("true" === `${s.controllerBanned}`) return void Bt({
                            end: !0,
                            endType: `ban-${s.timeUnit}-${s.banTime}`
                        });
                        Bt({
                            end: !0,
                            endType: ""
                        })
                    }
                    t && t()
                }

                function Vt(e) {
                    let {
                        linkId: t
                    } = e;
                    return Z({
                        linkId: t,
                        msgData: e,
                        msgType: "controllink",
                        isGroup: i === M,
                        otherParams: {
                            isFirst: !0
                        }
                    })
                }
                Object(n.useEffect)(() => {
                    const e = function() {
                        let e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                        a(t), p(i), x(Ii), zt(), St(), he.get(`taptip_${t}`) ? Qt() : e ? Gt() : Qt()
                    };
                    return (async () => {
                        let t = "1" === ue("returnFromAppStore"),
                            i = "1" === ue("closeWakeApp"),
                            n = "1" === ue("returnFromApp");
                        "105" === ue("share_type") || i || Ii || Qi ? e() : t || n ? (it(), e()) : await Ct(t => {
                            t ? (De.current = !1, Gt()) : e(!1)
                        })
                    })(), () => {
                        clearInterval(Gi)
                    }
                }, []), Object(n.useEffect)(() => {
                    if (A) {
                        if (i === m) {
                            clearTimeout(Pi);
                            let e = {
                                linkId: Hi,
                                event: "controllinkDidEnd",
                                message: ""
                            };
                            ke(JSON.stringify(e))
                        }
                        clearInterval(Gi), Xi.disconnect(), _([], F)
                    }
                }, [A]);
                const It = e => {
                    if (!Ki) {
                        let t = {
                            ackId: Object(g.a)(),
                            linkId: e
                        };
                        Xi.emit("anon_query_control_info_ts", t);
                        let i = {
                            ackId: Object(g.a)(),
                            userId: Wi.current,
                            linkId: e
                        };
                        Xi.emit("query_user_on_line_info_ts", i)
                    }
                };

                function Qt() {
                    i === M ? at() : wt()
                }
                const Pt = e => {
                        var t;
                        switch (e.code) {
                            case 5009101:
                                Bt({
                                    end: !0,
                                    endType: "valid"
                                });
                                break;
                            case 5009102:
                                Bt({
                                    end: !0,
                                    endType: "banned"
                                });
                                break;
                            case 5009103:
                                Bt({
                                    end: !0,
                                    endType: "expired"
                                });
                                break;
                            case 5009104:
                                Bt({
                                    end: !0,
                                    endType: "taken"
                                });
                                break;
                            case 50093:
                                const {
                                    data: i
                                } = e;
                                "true" === `${i.controllerBanned}` && Bt({
                                    end: !0,
                                    endType: `ban-${i.timeUnit}-${i.banTime}`
                                }), Bt({
                                    end: !0
                                });
                                break;
                            case 50091:
                                Ee("isShowLimit");
                                break;
                            case 50092:
                                Ee("isBanPage");
                                break;
                            default:
                                null !== e && void 0 !== e && null !== (t = e.data) && void 0 !== t && t.anotherPlaying && Ee("isAnotherPlaying"), "true" !== `${e.result}` && Ee("default")
                        }
                    },
                    Gt = Object(n.useCallback)(() => {
                        oe(() => Object(we.jsxs)(we.Fragment, {
                            children: [Object(we.jsx)("p", {
                                children: "This link may contain adult content. Please verify your age below and protect your personal info during this session."
                            }), Object(we.jsx)("p", {
                                children: "Any text, voice, video, or other media you share in the chat will be directly accessible to the recipient. Please be careful about what you say."
                            }), Object(we.jsxs)("p", {
                                children: ["By joining this link, you are agreeing to our", Object(we.jsx)("a", {
                                    style: {
                                        color: "#FF2D89"
                                    },
                                    href: ge.termsAndConditions,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: " Control Link T&C"
                                }), " and ", Object(we.jsx)("a", {
                                    style: {
                                        color: "#FF2D89"
                                    },
                                    href: ge.remoteGeneralTerms,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Remote general Terms."
                                })]
                            })]
                        })), pe(!0)
                    }, [ge]);

                function Xt(e, t) {
                    var n;
                    i === M ? (n = e, k.post(y.reportUrl + "/control_link_group/im/send_msg", n)).then(e => {
                        if (e.result) {
                            const {
                                msgId: i,
                                sendStatus: n
                            } = e.data;
                            n && t && t(i)
                        }
                    }) : (Xi.emit("q_send_im_msg_ts", e), qi = t)
                }
                const qt = e => {
                        setTimeout(() => {
                            const t = Object(g.a)().replaceAll("-", "").toLowerCase();
                            Me(t), Te({
                                lang: (navigator.language || navigator.browserLanguage).toLowerCase(),
                                requestId: t,
                                linkId: e,
                                refererChannel: ue("referer_channel"),
                                device: Ii ? "pc" : "mobile"
                            }).then(e => {
                                var t;
                                if (e.result && e.data && (e.data.adPicture && ((new Image).src = e.data.adPicture), e.data.item && null !== (t = e.data.item.adList) && void 0 !== t && t.length)) {
                                    e.data.item.adList.filter(e => e.pictureType === (Ii ? "pc" : "mobile")).forEach(e => {
                                        (new Image).src = e.adPicture
                                    })
                                }
                            })
                        }, 5e3)
                    },
                    Yt = (e, t) => {
                        let i = e || "";
                        return "reachMax" === e ? Ue(!0) : "over" === e ? Re("over") : void("start" !== e ? (Xi.disconnect(), Bt({
                            end: !0,
                            endType: i
                        })) : t && be(t))
                    },
                    Wt = (e, t) => {
                        i === M ? function(e, t) {
                            (i = {
                                groupSessionId: e
                            }, k.post(y.reportUrl + "/control_link_group/exit_session", i)).then(e => {
                                e && (Bt({
                                    end: !0,
                                    endType: "time_up"
                                }), Xi.disconnect(), t && t())
                            });
                            var i
                        }(e, t) : Jt(e, t)
                    };

                function Jt(e, t) {
                    Xi.emit("anon_end_control_link_ts", {
                        ackId: Object(g.a)(),
                        linkId: e
                    }), Yi = t, Pi = setTimeout(() => {
                        Xi.disconnect(), Bt({
                            end: !0,
                            endType: ""
                        })
                    }, 3e3)
                }
                const [Ht, Kt] = Object(n.useState)(!1), Zt = () => {
                    Kt(!1)
                };
                return Object(we.jsx)(Ai, {
                    children: Object(we.jsx)(ht, {
                        setShowAcceptControlTips: Kt,
                        closeAcceptControlTips: Zt,
                        children: ae ? Object(we.jsx)(Oi, {
                            showCancel: !0,
                            content: Ae,
                            handleAgree: () => {
                                De.current ? (it(), Qt()) : nt()
                            },
                            handleDisagree: () => {
                                pe(!1), Bt({
                                    end: !0,
                                    endType: "valid"
                                })
                            }
                        }) : Object(we.jsxs)(we.Fragment, {
                            children: [!ie && (Ii ? Object(we.jsxs)("div", {
                                className: "page pc-page " + (i === M ? "group-chat-page" : "single-chat-page"),
                                children: [Object(we.jsx)("div", {
                                    className: "download-box",
                                    children: Object(we.jsx)(wi, {})
                                }), Object(we.jsx)("div", {
                                    className: "pc-header",
                                    children: Object(we.jsx)("img", {
                                        src: Ui,
                                        onClick: () => {
                                            window.open("https://www.lovense.com/", "_blank")
                                        },
                                        alt: ""
                                    })
                                }), Object(we.jsxs)("div", {
                                    className: "pc-main",
                                    children: [Object(we.jsx)("div", {
                                        className: "pc-left",
                                        children: Object(we.jsx)(di, {
                                            exitChatRoom: Wt,
                                            renderChatItemAndSendToServer: ot
                                        })
                                    }), Object(we.jsxs)("div", {
                                        className: "pc-center",
                                        children: [Object(we.jsx)("div", {
                                            className: "pc-center-top",
                                            children: Object(we.jsx)(vt, {
                                                time: fe,
                                                stop: ve,
                                                reachMax: Ne
                                            })
                                        }), Object(we.jsx)("div", {
                                            className: "pc-center-bottom",
                                            children: Object(we.jsx)(Ri, {
                                                ref: Fe,
                                                exitChatRoom: Wt,
                                                sendMsgToServer: Xt,
                                                prohibitedWordRef: $e
                                            })
                                        })]
                                    }), i === M && Object(we.jsx)("div", {
                                        className: "pc-right",
                                        children: Object(we.jsx)(Ni, {})
                                    })]
                                })]
                            }) : Object(we.jsxs)("div", {
                                className: "page mobile-page " + (i === M ? "group-chat-page" : "single-chat-page"),
                                children: [Object(we.jsxs)("div", {
                                    className: "hd",
                                    children: [!A && Object(we.jsx)(Je, {
                                        chatEndStatus: ce,
                                        chatMode: i,
                                        isChatEnd: A
                                    }), Object(we.jsx)(Fi, {
                                        setEndAndEndType: Bt,
                                        exitChatRoom: Wt
                                    })]
                                }), Object(we.jsx)("div", {
                                    className: "bd",
                                    children: Object(we.jsx)(vt, {
                                        time: fe,
                                        stop: ve,
                                        reachMax: Ne
                                    })
                                }), Object(we.jsx)("div", {
                                    className: "ft",
                                    children: Object(we.jsx)(Ri, {
                                        ref: Fe,
                                        exitChatRoom: Wt,
                                        sendMsgToServer: Xt,
                                        prohibitedWordRef: $e
                                    })
                                })]
                            })), ie && Object(we.jsx)(Ie, {}), A && Object(we.jsx)(tt, {
                                endType: ce,
                                adRequestId: me,
                                linkHubSource: Qe,
                                shareType: ue("share_type")
                            }), de && Object(we.jsx)(Le, {
                                pageStatus: de
                            }), Object(we.jsx)(Vi, {
                                show: Ht,
                                onClose: Zt
                            })]
                        })
                    })
                })
            },
            _i = (i(1121), i(1122), i(299));
        var $i = () => Object(we.jsx)("div", {
            className: "loading-box",
            children: Object(we.jsx)("div", {
                className: "content",
                children: Object(we.jsx)(_i.a, {})
            })
        });
        Y.setDynamicKeyValue(y.reportAesKey, y.reportAesIv);
        var en = () => {
            const e = ue("linkId"),
                t = ue("groupSessionId"),
                i = ue("ofId"),
                n = ue("role"),
                s = le(),
                [A, r] = z.a.useState([]),
                [o, a] = z.a.useState([]),
                [p, c] = z.a.useState([]),
                [l, E] = z.a.useState(!1),
                [x, u] = z.a.useState(!1),
                [g, m] = z.a.useState(""),
                [M, f] = z.a.useState({
                    name: "",
                    email: "",
                    remail: "",
                    type: "",
                    issue: "",
                    selectedGroupMember: []
                }),
                [j, h] = z.a.useState([]),
                [b, v] = z.a.useState({
                    type: !1,
                    groupMember: !1
                }),
                T = e => {
                    v(t => {
                        const i = {};
                        return Object.keys(t).forEach(e => {
                            i[e] = !1
                        }), i[e] = !t[e], i
                    })
                },
                R = z.a.useMemo(() => [{
                    placeholder: d.t("report_info_name"),
                    name: "name",
                    error: ""
                }, {
                    placeholder: d.t("report_info_email1"),
                    name: "email",
                    error: d.t("report_invalid_email")
                }, {
                    placeholder: d.t("report_info_email2"),
                    name: "remail",
                    error: d.t("report_email_not_match")
                }, {
                    placeholder: d.t("report_type"),
                    name: "type",
                    error: ""
                }, {
                    placeholder: d.t("report_info_description"),
                    name: "issue",
                    error: "content must more than 15 characters"
                }], []),
                [N, U] = z.a.useState(R),
                F = [d.t("user_report_reason2"), d.t("user_report_reason3"), d.t("user_report_reason4")];
            z.a.useEffect(() => {
                if (!t) return;
                const e = [...R.slice(0, 3), {
                    placeholder: d.t("report_group_session_member"),
                    name: "groupMember",
                    error: ""
                }, ...R.slice(3)];
                U(e)
            }, [t, R]), z.a.useEffect(() => {
                if (!t) return;
                (async () => {
                    try {
                        const {
                            data: e
                        } = await
                        function(e, t) {
                            return k.post(y.reportUrl + "/control_link_group/report/get_member_list", {
                                groupSessionId: e,
                                ofId: t
                            })
                        }(t, i), n = e.groupSessionMemberList;
                        if (console.log("fetchGroupMembers", e), n && Array.isArray(n)) {
                            const e = n.map(e => ({
                                userId: e.userId,
                                showName: e.showName
                            }));
                            e.unshift({
                                userId: "all",
                                showName: "All"
                            }), console.log("memberOptions", e), h(e)
                        }
                    } catch (e) {
                        console.error("Error fetching group members:", e)
                    }
                })()
            }, [t, i]);
            const O = function(e) {
                    if (e) {
                        if (!(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : A).length) return E(!1);
                        console.log("obj", e);
                        for (const i in e)
                            if (Object.hasOwnProperty.call(e, i)) {
                                const n = e[i],
                                    z = "string" === typeof n ? n.trim() : n;
                                if ("string" === typeof n && !z) return E(!1);
                                if (Array.isArray(n) && 0 === n.length && t) return E(!1)
                            } E(!0)
                    }
                },
                D = e => {
                    const t = e.target,
                        i = "checkbox" === t.type ? t.checked : t.value,
                        n = t.name;
                    let z = {
                        ...M
                    };
                    z[n] = i, f(z), O(z)
                },
                B = async () => {
                    if (l && !o.length) try {
                        u(!0);
                        let t = F.indexOf(M.type) + 1,
                            z = {
                                name: M.name,
                                acc: Y.aesEncryptXy(M.email),
                                content: M.issue,
                                reportType: t
                            };
                        i && (z.of = Y.aesEncryptXy(i)), z.reportedRole = "1" === `${n}` ? 1 : 2, z.linkId = e;
                        let s = new FormData;
                        for (const e of p) s.append("files", e);
                        const {
                            data: A
                        } = await Fe(s);
                        let r = new FormData;
                        z.medias = A;
                        for (const e in z)
                            if (Object.hasOwnProperty.call(z, e)) {
                                const t = z[e];
                                r.append(e, t)
                            } const {
                            message: o
                        } = await
                        function(e) {
                            return k.post(y.reportUrl + "/remote/controllink/report", e, {
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            })
                        }(r);
                        if ("success" === o) return m("success"), void u(!1);
                        u(!1), m("failed")
                    } catch (t) {
                        u(!1), m(t.message || "failed")
                    }
                }, S = async () => {
                    if (l && !o.length) try {
                        u(!0);
                        let e = F.indexOf(M.type) + 1;
                        if (t && !M.selectedGroupMember && 0 === M.selectedGroupMember.length) return m(d.t("please_select_reported_member")), void u(!1);
                        let n = {
                            groupSessionId: t,
                            name: M.name,
                            acc: Y.aesEncryptXy(M.email),
                            confAcc: Y.aesEncryptXy(M.remail),
                            content: M.issue,
                            reportType: e,
                            reportedUsers: M.selectedGroupMember
                        };
                        i && (n.of = Y.aesEncryptXy(i));
                        let z = new FormData;
                        for (const t of p) z.append("files", t);
                        if (p.length > 0) {
                            const {
                                data: e
                            } = await Fe(z);
                            n.medias = e
                        }
                        const {
                            message: s
                        } = await
                        function(e) {
                            return k.post(y.reportUrl + "/control_link_group/report", e)
                        }(n);
                        if ("success" === s || "ok" === s) return m("success"), void u(!1);
                        u(!1), m("failed")
                    } catch (e) {
                        u(!1), m(e.message || "failed")
                    }
                }, C = e => "type" === e.name ? L(e) : "groupMember" === e.name ? V(e) : w(e), w = e => Object(we.jsx)("input", {
                    onBlur: () => (e => {
                        window.scrollTo(0, 0);
                        let t = [...o],
                            i = M[e];
                        if ("remail" === e && i !== M.email) return t.includes("remail") || t.push(e), void a(t);
                        if ("email" === e) {
                            let n = /^(\w)+([-.\w+])*@([\w\-#])+((\.\w+)+)$/;
                            if (M.remail && M.remail !== i && !t.includes("remail") && t.push("remail"), "" === i || !n.test(i)) return t.includes("email") || t.push(e), void a(t);
                            if (M.remail === i) {
                                const e = t.indexOf("remail"); - 1 !== e && t.splice(e, 1)
                            }
                        }
                        if ("issue" === e && i.length <= 15) return t.includes("issue") || t.push(e), void a(t);
                        const n = t.indexOf(e); - 1 !== n && t.splice(n, 1), a(t)
                    })(e.name),
                    name: e.name,
                    onChange: D,
                    placeholder: e.placeholder
                }), L = e => {
                    const t = e.name,
                        i = M[t],
                        n = b[t];
                    let z = [];
                    if ("type" === t) z = F;
                    else z = [];
                    return Object(we.jsxs)("div", {
                        onClick: () => T(t),
                        className: "select-item",
                        style: {
                            height: "100%"
                        },
                        children: [Object(we.jsx)("span", {
                            className: "select " + (i ? "onselect" : ""),
                            children: i || e.placeholder
                        }), Object(we.jsx)("i", {
                            className: "select-icon " + (n ? "rotate" : "")
                        }), Object(we.jsx)("div", {
                            className: "select-box " + (n ? "show" : ""),
                            children: z.map((e, n) => Object(we.jsx)("div", {
                                className: "select-data " + (e === i ? "on" : ""),
                                onClick: i => {
                                    i.stopPropagation(), (e => {
                                        if (e && "string" === typeof e) {
                                            const i = {
                                                ...M
                                            };
                                            i[t] = e, f(i), O(i)
                                        }
                                        T(t)
                                    })(e)
                                },
                                children: e
                            }, n))
                        })]
                    })
                }, V = e => {
                    const t = e.name,
                        i = M.selectedGroupMember,
                        n = b[t];
                    let z = j;
                    return console.log("row:", e), console.log("selectedMemberIds:", i), console.log("\u5305\u542b\u6d4b\u8bd5:", i.includes(e.userId)), Object(we.jsxs)("div", {
                        onClick: () => T(t),
                        className: "select-item",
                        style: {
                            height: "100%"
                        },
                        children: [Object(we.jsx)("span", {
                            className: "select " + (i.length > 0 ? "onselect" : ""),
                            children: i.length > 0 ? i.map(e => {
                                var t;
                                return null === (t = j.find(t => t.userId === e)) || void 0 === t ? void 0 : t.showName
                            }).join(", ") : e.placeholder
                        }), Object(we.jsx)("i", {
                            className: "select-icon " + (n ? "rotate" : "")
                        }), Object(we.jsx)("div", {
                            className: "select-box " + (n ? "show" : ""),
                            children: z.map((e, t) => Object(we.jsx)("div", {
                                className: "select-data " + (Array.isArray(i) && i.includes(e.userId) ? "on" : ""),
                                onClick: t => {
                                    t.stopPropagation(), (e => {
                                        console.log("value", e);
                                        let t = {
                                            ...M
                                        };
                                        const n = e.userId;
                                        if ("all" === n) {
                                            const e = j.slice(1).map(e => e.userId),
                                                n = e.every(e => i.includes(e));
                                            t.selectedGroupMember = n ? [] : e
                                        } else t.selectedGroupMember = i.includes(n) ? i.filter(e => e !== n) : [...i, n];
                                        console.log("updatedData", t), f(t), O(t)
                                    })(e)
                                },
                                children: e.showName
                            }, t))
                        })]
                    })
                };
            return Object(we.jsxs)("div", {
                className: s ? "pc-report-page" : "report-page",
                children: [x && Object(we.jsx)($i, {}), Object(we.jsx)("div", {
                    className: "report-header",
                    onClick: () => {
                        window.open("https://www.lovense.com/", "_blank")
                    },
                    children: Object(we.jsx)("img", {
                        src: Ui,
                        alt: ""
                    })
                }), Object(we.jsx)("div", {
                    className: "report-title",
                    children: d.t("patterns_menu_report")
                }), Object(we.jsxs)("div", {
                    className: "report-content",
                    children: [Object(we.jsx)("div", {
                        className: "title",
                        children: d.t("report_page_title")
                    }), N.map((e, t) => {
                        const i = N.length - t;
                        return Object(we.jsxs)("div", {
                            className: "input-item",
                            style: {
                                zIndex: i
                            },
                            children: [C(e), o.includes(e.name) && Object(we.jsx)("div", {
                                className: "err-tips",
                                children: e.error
                            })]
                        }, t)
                    }), Object(we.jsxs)("div", {
                        className: "photo-list",
                        children: [A.map((e, t) => Object(we.jsxs)("div", {
                            className: "photo-item",
                            children: [Object(we.jsx)("img", {
                                className: "photo",
                                src: e.src,
                                alt: e.id
                            }), Object(we.jsx)("i", {
                                className: "close-icon",
                                onClick: () => (e => {
                                    let t = [...A];
                                    t.splice(e, 1);
                                    let i = [...p];
                                    i.splice(e, 1), c(i), r(t), O(M, t)
                                })(t)
                            })]
                        }, t)), 5 !== A.length && Object(we.jsxs)("div", {
                            className: "photo-item upload",
                            onClick: () => {
                                document.getElementById("add-file").click()
                            },
                            children: [Object(we.jsx)("input", {
                                id: "add-file",
                                accept: "image/*",
                                type: "file",
                                onChange: e => {
                                    var t = e.target.files[0];
                                    if (t) {
                                        if (! function(e) {
                                                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3,
                                                    i = !1;
                                                return i = e.target.files[0].size <= 1048576 * t, i
                                            }(e, 3)) {
                                            m(d.t("add_photo_maxsize"));
                                            let e = document.getElementById("add-file");
                                            return void(e && (e.value = ""))
                                        }
                                        var i = new FileReader;
                                        i.readAsDataURL(t), i.onload = e => {
                                            let i = [...A];
                                            i.push({
                                                src: e.currentTarget.result,
                                                id: A.length
                                            }), c([...p, t]), r(i), O(M, i);
                                            let n = document.getElementById("add-file");
                                            n && (n.value = "")
                                        }
                                    }
                                }
                            }), Object(we.jsx)("div", {
                                className: "up-img"
                            }), Object(we.jsx)("div", {
                                className: "text",
                                children: A.length ? `${A.length}/5` : d.t("button_add_photo")
                            })]
                        })]
                    }), Object(we.jsx)("div", {
                        className: `send-btn ${l&&!o.length&&"on"}`,
                        disabled: !l,
                        onClick: async () => {
                            t ? S() : B()
                        },
                        children: "Send"
                    })]
                }), g && Object(we.jsx)(Oi, {
                    showCancel: !1,
                    content: g,
                    handleAgree: () => {
                        "success" === g && window.open("about:blank", "_self").close(), m("")
                    }
                })]
            })
        };
        String.prototype.replaceAll || (String.prototype.replaceAll = function(e, t) {
            return "[object regexp]" === Object.prototype.toString.call(e).toLowerCase() ? this.replace(e, t) : this.replace(new RegExp(e, "g"), t)
        }), A.default.startCapture();
        const tn = "CacheLangValueKey",
            nn = "CacheLangVersionKey";
        ! function() {
            let e = navigator.language,
                t = {
                    en: {
                        translation: c
                    },
                    ja: {
                        translation: l
                    }
                };
            a.a.use(p.e).init({
                fallbackLng: "en",
                lng: e,
                debug: !1,
                resources: t,
                interpolation: {
                    escapeValue: !1
                }
            });
            const i = Ee().iPhone ? "ios" : "android";
            (function(e) {
                let t = {
                    appName: "controlLink",
                    appVersion: "1.0.0",
                    device: e,
                    timeMillis: Date.now()
                };
                return t = Object(ve.a)(JSON.stringify(t)), k.get(y.getLangUrl + "/date-web-api/appTranslationV3/controlLink/getVersion", {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        dtxToken: t
                    }
                })
            })(i).then(e => {
                if (e.result) {
                    let n = null;
                    try {
                        n = JSON.parse(localStorage.getItem(nn))
                    } catch (t) {
                        console.error("\u8bfb\u53d6\u672c\u5730\u7f13\u5b58lang\u7248\u672c\u5931\u8d25: ", t)
                    }
                    let z = null;
                    try {
                        z = JSON.parse(localStorage.getItem(tn))
                    } catch (t) {
                        console.error("\u8bfb\u53d6\u672c\u5730\u7f13\u5b58lang\u914d\u7f6e\u5931\u8d25: ", t)
                    }
                    if (!z) return Ue({
                        lang: e.data.version,
                        device: i
                    });
                    if (!n) return Ue({
                        lang: e.data.version,
                        device: i
                    });
                    if (Object.keys(e.data.version).some(t => e.data.version[t] !== n[t])) return Ue({
                        lang: e.data.version,
                        device: i
                    })
                }
                return Promise.resolve()
            }, () => {}).then(i => {
                i && i.result && (localStorage.setItem(tn, JSON.stringify(i.data.lang)), localStorage.setItem(nn, JSON.stringify(i.data.version)));
                let n = null;
                try {
                    n = JSON.parse(localStorage.getItem(tn))
                } catch (z) {
                    console.error("\u8bfb\u53d6\u672c\u5730\u7f13\u5b58lang\u914d\u7f6e\u5931\u8d252: ", z)
                }
                n && (t = {
                    en: {
                        translation: Object.assign(c, n.en)
                    },
                    ja: {
                        translation: n.ja
                    }
                }, a.a.use(p.e).init({
                    fallbackLng: "en",
                    lng: e,
                    debug: !0,
                    resources: t,
                    interpolation: {
                        escapeValue: !1
                    }
                }))
            })
        }(), pe();
        Object(s.createRoot)(document.getElementById("root")).render(Object(we.jsx)(r.a, {
            path: "/",
            children: Object(we.jsxs)(o.c, {
                children: [Object(we.jsx)(o.a, {
                    path: "/c2/report",
                    exact: !0,
                    component: en
                }), Object(we.jsx)(o.a, {
                    path: "/v2/report",
                    exact: !0,
                    component: en
                }), ["gcls", "t2", "c2", "v2"].map(e => Object(we.jsx)(o.a, {
                    path: `/${e}/:code`,
                    exact: !0,
                    component: Zi
                }, e))]
            })
        }))
    }]), [
        [1125, 1, 2]
    ]
]);
