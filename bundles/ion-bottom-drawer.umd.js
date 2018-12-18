(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ionic-angular')) :
    typeof define === 'function' && define.amd ? define('ion-bottom-drawer', ['exports', '@angular/core', 'ionic-angular'], factory) :
    (factory((global['ion-bottom-drawer'] = {}),global.ng.core,null));
}(this, (function (exports,core,ionicAngular) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @enum {number} */
    var DrawerState = {
        Bottom: 0,
        Docked: 1,
        Top: 2,
    };
    DrawerState[DrawerState.Bottom] = "Bottom";
    DrawerState[DrawerState.Docked] = "Docked";
    DrawerState[DrawerState.Top] = "Top";

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var IonBottomDrawerComponent = (function () {
        function IonBottomDrawerComponent(_element, _renderer, _domCtrl, _platform) {
            this._element = _element;
            this._renderer = _renderer;
            this._domCtrl = _domCtrl;
            this._platform = _platform;
            this.dockedHeight = 50;
            this.shouldBounce = true;
            this.distanceTop = 0;
            this.transition = '0.25s ease-in-out';
            this.state = DrawerState.Bottom;
            this.minimumHeight = 0;
            this.stateChange = new core.EventEmitter();
            this._BOUNCE_DELTA = 30;
        }
        /**
         * @return {?}
         */
        IonBottomDrawerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._renderer.setStyle(this._element.nativeElement.querySelector('.ion-bottom-drawer-scrollable-content .scroll-content'), 'touch-action', 'none');
                this._setDrawerState(this.state);
                var /** @type {?} */ hammer = new Hammer(this._element.nativeElement.querySelector('.drawer-toolbar'));
                hammer.get('pan').set({ enable: true, direction: Hammer.DIRECTION_VERTICAL });
                hammer.on('pan panstart panend', function (ev) {
                    switch (ev.type) {
                        case 'panstart':
                            _this._handlePanStart();
                            break;
                        case 'panend':
                            _this._handlePanEnd(ev);
                            break;
                        default:
                            _this._handlePan(ev);
                    }
                });
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        IonBottomDrawerComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (!changes["state"])
                    return;
                this._setDrawerState(changes["state"].currentValue);
            };
        /**
         * @param {?} state
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._setDrawerState = /**
         * @param {?} state
         * @return {?}
         */
            function (state) {
                this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);
                switch (state) {
                    case DrawerState.Bottom:
                        this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
                        break;
                    case DrawerState.Docked:
                        this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
                        break;
                    default:
                        this._setTranslateY(this.distanceTop + 'px');
                }
            };
        /**
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._handlePanStart = /**
         * @return {?}
         */
            function () {
                this._startPositionTop = this._element.nativeElement.getBoundingClientRect().top;
            };
        /**
         * @param {?} ev
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._handlePanEnd = /**
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                if (this.shouldBounce && ev.isFinal) {
                    this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);
                    switch (this.state) {
                        case DrawerState.Docked:
                            this._handleDockedPanEnd(ev);
                            break;
                        case DrawerState.Top:
                            this._handleTopPanEnd(ev);
                            break;
                        default:
                            this._handleBottomPanEnd(ev);
                    }
                }
                this.stateChange.emit(this.state);
            };
        /**
         * @param {?} ev
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._handleTopPanEnd = /**
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                if (ev.deltaY > this._BOUNCE_DELTA) {
                    this.state = DrawerState.Docked;
                }
                else {
                    this._setTranslateY(this.distanceTop + 'px');
                }
            };
        /**
         * @param {?} ev
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._handleDockedPanEnd = /**
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                var /** @type {?} */ absDeltaY = Math.abs(ev.deltaY);
                if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY < 0) {
                    this.state = DrawerState.Top;
                }
                else if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY > 0) {
                    this.state = DrawerState.Bottom;
                }
                else {
                    this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
                }
            };
        /**
         * @param {?} ev
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._handleBottomPanEnd = /**
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                if (-ev.deltaY > this._BOUNCE_DELTA) {
                    this.state = DrawerState.Docked;
                }
                else {
                    this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
                }
            };
        /**
         * @param {?} ev
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._handlePan = /**
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                var /** @type {?} */ pointerY = ev.center.y;
                this._renderer.setStyle(this._element.nativeElement, 'transition', 'none');
                if (pointerY > 0 && pointerY < this._platform.height()) {
                    if (ev.additionalEvent === 'panup' || ev.additionalEvent === 'pandown') {
                        var /** @type {?} */ newTop = this._startPositionTop + ev.deltaY;
                        if (newTop >= this.distanceTop)
                            this._setTranslateY(newTop + 'px');
                        else if (newTop < this.distanceTop)
                            this._setTranslateY(this.distanceTop + 'px');
                        if (newTop > this._platform.height() - this.minimumHeight)
                            this._setTranslateY((this._platform.height() - this.minimumHeight) + 'px');
                    }
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        IonBottomDrawerComponent.prototype._setTranslateY = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                this._domCtrl.write(function () {
                    _this._renderer.setStyle(_this._element.nativeElement, 'transform', 'translateY(' + value + ')');
                });
            };
        IonBottomDrawerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ion-bottom-drawer',
                        template: "<ion-content class=\"ion-bottom-drawer-scrollable-content\" no-bounce>\n  <ng-content></ng-content>\n</ion-content>\n",
                        styles: [":host{width:100%;height:100%;position:absolute;left:0;z-index:11!important;background-color:#fff;-webkit-transform:translateY(100vh);transform:translateY(100vh)}"]
                    },] },
        ];
        /** @nocollapse */
        IonBottomDrawerComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: core.Renderer2, },
                { type: ionicAngular.DomController, },
                { type: ionicAngular.Platform, },
            ];
        };
        IonBottomDrawerComponent.propDecorators = {
            "dockedHeight": [{ type: core.Input },],
            "shouldBounce": [{ type: core.Input },],
            "distanceTop": [{ type: core.Input },],
            "transition": [{ type: core.Input },],
            "state": [{ type: core.Input },],
            "minimumHeight": [{ type: core.Input },],
            "stateChange": [{ type: core.Output },],
        };
        return IonBottomDrawerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var IonBottomDrawerModule = (function () {
        function IonBottomDrawerModule() {
        }
        IonBottomDrawerModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [IonBottomDrawerComponent],
                        imports: [ionicAngular.IonicModule],
                        exports: [IonBottomDrawerComponent]
                    },] },
        ];
        return IonBottomDrawerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.IonBottomDrawerModule = IonBottomDrawerModule;
    exports.DrawerState = DrawerState;
    exports.ɵa = IonBottomDrawerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJvdHRvbS1kcmF3ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9pb24tYm90dG9tLWRyYXdlci9tb2R1bGVzL2lvbi1ib3R0b20tZHJhd2VyL2lvbi1ib3R0b20tZHJhd2VyLnRzIiwibmc6Ly9pb24tYm90dG9tLWRyYXdlci9tb2R1bGVzL2lvbi1ib3R0b20tZHJhd2VyL2lvbi1ib3R0b20tZHJhd2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYXRmb3JtLCBEb21Db250cm9sbGVyIH0gZnJvbSAnaW9uaWMtYW5ndWxhcic7XG5cbmltcG9ydCB7IERyYXdlclN0YXRlIH0gZnJvbSAnLi9kcmF3ZXItc3RhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tYm90dG9tLWRyYXdlcicsXG4gIHRlbXBsYXRlOiBgPGlvbi1jb250ZW50IGNsYXNzPVwiaW9uLWJvdHRvbS1kcmF3ZXItc2Nyb2xsYWJsZS1jb250ZW50XCIgbm8tYm91bmNlPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2lvbi1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3otaW5kZXg6MTEhaW1wb3J0YW50O2JhY2tncm91bmQtY29sb3I6I2ZmZjstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMHZoKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDB2aCl9YF1cbn0pXG5leHBvcnQgY2xhc3MgSW9uQm90dG9tRHJhd2VyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZG9ja2VkSGVpZ2h0OiBudW1iZXIgPSA1MDtcblxuICBASW5wdXQoKSBzaG91bGRCb3VuY2U6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRpc3RhbmNlVG9wOiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpIHRyYW5zaXRpb246IHN0cmluZyA9ICcwLjI1cyBlYXNlLWluLW91dCc7XG5cbiAgQElucHV0KCkgc3RhdGU6IERyYXdlclN0YXRlID0gRHJhd2VyU3RhdGUuQm90dG9tO1xuXG4gIEBJbnB1dCgpIG1pbmltdW1IZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RHJhd2VyU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmF3ZXJTdGF0ZT4oKTtcblxuICBwcml2YXRlIF9zdGFydFBvc2l0aW9uVG9wOiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX0JPVU5DRV9ERUxUQSA9IDMwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9kb21DdHJsOiBEb21Db250cm9sbGVyLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlvbi1ib3R0b20tZHJhd2VyLXNjcm9sbGFibGUtY29udGVudCAuc2Nyb2xsLWNvbnRlbnQnKSwgJ3RvdWNoLWFjdGlvbicsICdub25lJyk7XG4gICAgdGhpcy5fc2V0RHJhd2VyU3RhdGUodGhpcy5zdGF0ZSk7XG5cbiAgICBjb25zdCBoYW1tZXIgPSBuZXcgSGFtbWVyKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgaGFtbWVyLmdldCgncGFuJykuc2V0KHsgZW5hYmxlOiB0cnVlLCBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fVkVSVElDQUwgfSk7XG4gICAgaGFtbWVyLm9uKCdwYW4gcGFuc3RhcnQgcGFuZW5kJywgKGV2OiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAoZXYudHlwZSkge1xuICAgICAgICBjYXNlICdwYW5zdGFydCc6XG4gICAgICAgICAgdGhpcy5faGFuZGxlUGFuU3RhcnQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFuZW5kJzpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVQYW5FbmQoZXYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuX2hhbmRsZVBhbihldik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCFjaGFuZ2VzLnN0YXRlKSByZXR1cm47XG4gICAgdGhpcy5fc2V0RHJhd2VyU3RhdGUoY2hhbmdlcy5zdGF0ZS5jdXJyZW50VmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RHJhd2VyU3RhdGUoc3RhdGU6IERyYXdlclN0YXRlKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbik7XG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBEcmF3ZXJTdGF0ZS5Cb3R0b206XG4gICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoJ2NhbGMoMTAwdmggLSAnICsgdGhpcy5taW5pbXVtSGVpZ2h0ICsgJ3B4KScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhd2VyU3RhdGUuRG9ja2VkOlxuICAgICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKCh0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSAtIHRoaXMuZG9ja2VkSGVpZ2h0KSArICdweCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkodGhpcy5kaXN0YW5jZVRvcCArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVBhblN0YXJ0KCkge1xuICAgIHRoaXMuX3N0YXJ0UG9zaXRpb25Ub3AgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlUGFuRW5kKGV2KSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkQm91bmNlICYmIGV2LmlzRmluYWwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCB0aGlzLnRyYW5zaXRpb24pO1xuXG4gICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgY2FzZSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ6XG4gICAgICAgICAgdGhpcy5faGFuZGxlRG9ja2VkUGFuRW5kKGV2KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBEcmF3ZXJTdGF0ZS5Ub3A6XG4gICAgICAgICAgdGhpcy5faGFuZGxlVG9wUGFuRW5kKGV2KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVCb3R0b21QYW5FbmQoZXYpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlLmVtaXQodGhpcy5zdGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUb3BQYW5FbmQoZXYpIHtcbiAgICBpZiAoZXYuZGVsdGFZID4gdGhpcy5fQk9VTkNFX0RFTFRBKSB7XG4gICAgICB0aGlzLnN0YXRlID0gRHJhd2VyU3RhdGUuRG9ja2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKHRoaXMuZGlzdGFuY2VUb3AgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVEb2NrZWRQYW5FbmQoZXYpIHtcbiAgICBjb25zdCBhYnNEZWx0YVkgPSBNYXRoLmFicyhldi5kZWx0YVkpXG4gICAgaWYgKGFic0RlbHRhWSA+IHRoaXMuX0JPVU5DRV9ERUxUQSAmJiBldi5kZWx0YVkgPCAwKSB7XG4gICAgICB0aGlzLnN0YXRlID0gRHJhd2VyU3RhdGUuVG9wO1xuICAgIH0gZWxzZSBpZiAoYWJzRGVsdGFZID4gdGhpcy5fQk9VTkNFX0RFTFRBICYmIGV2LmRlbHRhWSA+IDApIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Cb3R0b21cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSgodGhpcy5fcGxhdGZvcm0uaGVpZ2h0KCkgLSB0aGlzLmRvY2tlZEhlaWdodCkgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVCb3R0b21QYW5FbmQoZXYpIHtcbiAgICBpZiAoLWV2LmRlbHRhWSA+IHRoaXMuX0JPVU5DRV9ERUxUQSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IERyYXdlclN0YXRlLkRvY2tlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSgnY2FsYygxMDB2aCAtICcgKyB0aGlzLm1pbmltdW1IZWlnaHQgKyAncHgpJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlUGFuKGV2KSB7XG4gICAgY29uc3QgcG9pbnRlclkgPSBldi5jZW50ZXIueTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJ25vbmUnKTtcbiAgICBpZiAocG9pbnRlclkgPiAwICYmIHBvaW50ZXJZIDwgdGhpcy5fcGxhdGZvcm0uaGVpZ2h0KCkpIHtcbiAgICAgIGlmIChldi5hZGRpdGlvbmFsRXZlbnQgPT09ICdwYW51cCcgfHwgZXYuYWRkaXRpb25hbEV2ZW50ID09PSAncGFuZG93bicpIHtcbiAgICAgICAgY29uc3QgbmV3VG9wID0gdGhpcy5fc3RhcnRQb3NpdGlvblRvcCArIGV2LmRlbHRhWTtcbiAgICAgICAgaWYgKG5ld1RvcCA+PSB0aGlzLmRpc3RhbmNlVG9wKSB0aGlzLl9zZXRUcmFuc2xhdGVZKG5ld1RvcCArICdweCcpO1xuICAgICAgICBlbHNlIGlmIChuZXdUb3AgPCB0aGlzLmRpc3RhbmNlVG9wKSB0aGlzLl9zZXRUcmFuc2xhdGVZKHRoaXMuZGlzdGFuY2VUb3AgKyAncHgnKTtcbiAgICAgICAgaWYgKG5ld1RvcCA+IHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpIC0gdGhpcy5taW5pbXVtSGVpZ2h0KSB0aGlzLl9zZXRUcmFuc2xhdGVZKCh0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSAtIHRoaXMubWluaW11bUhlaWdodCkgKyAncHgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRUcmFuc2xhdGVZKHZhbHVlKSB7XG4gICAgdGhpcy5fZG9tQ3RybC53cml0ZSgoKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgnICsgdmFsdWUgKyAnKScpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdpb25pYy1hbmd1bGFyJztcbmltcG9ydCB7IElvbkJvdHRvbURyYXdlckNvbXBvbmVudCB9IGZyb20gJy4vaW9uLWJvdHRvbS1kcmF3ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtJb25Cb3R0b21EcmF3ZXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbSW9uaWNNb2R1bGVdLFxuICBleHBvcnRzOiBbSW9uQm90dG9tRHJhd2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBJb25Cb3R0b21EcmF3ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyMiIsIkRvbUNvbnRyb2xsZXIiLCJQbGF0Zm9ybSIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJJb25pY01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7UUErQkUsa0NBQ1UsVUFDQSxXQUNBLFVBQ0E7WUFIQSxhQUFRLEdBQVIsUUFBUTtZQUNSLGNBQVMsR0FBVCxTQUFTO1lBQ1QsYUFBUSxHQUFSLFFBQVE7WUFDUixjQUFTLEdBQVQsU0FBUztnQ0FyQmEsRUFBRTtnQ0FFRCxJQUFJOytCQUVOLENBQUM7OEJBRUYsbUJBQW1CO3lCQUVuQixXQUFXLENBQUMsTUFBTTtpQ0FFZixDQUFDOytCQUVpQixJQUFJQSxpQkFBWSxFQUFlO2lDQUdqRCxFQUFFO1NBTzlCOzs7O1FBRUwsa0RBQWU7OztZQUFmO2dCQUFBLGlCQWtCQztnQkFqQkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHVEQUF1RCxDQUFDLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwSixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFakMscUJBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxDQUFDLEVB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