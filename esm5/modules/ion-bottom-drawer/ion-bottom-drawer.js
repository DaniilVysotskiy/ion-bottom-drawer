/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { Platform, DomController } from 'ionic-angular';
import { DrawerState } from './drawer-state';
var IonBottomDrawerComponent = /** @class */ (function () {
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
        this.stateChange = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'ion-bottom-drawer',
                    template: "<ion-content class=\"ion-bottom-drawer-scrollable-content\" no-bounce>\n  <ng-content></ng-content>\n</ion-content>\n",
                    styles: [":host{width:100%;height:100%;position:absolute;left:0;z-index:11!important;background-color:#fff;-webkit-transform:translateY(100vh);transform:translateY(100vh)}"]
                },] },
    ];
    /** @nocollapse */
    IonBottomDrawerComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: DomController, },
        { type: Platform, },
    ]; };
    IonBottomDrawerComponent.propDecorators = {
        "dockedHeight": [{ type: Input },],
        "shouldBounce": [{ type: Input },],
        "distanceTop": [{ type: Input },],
        "transition": [{ type: Input },],
        "state": [{ type: Input },],
        "minimumHeight": [{ type: Input },],
        "stateChange": [{ type: Output },],
    };
    return IonBottomDrawerComponent;
}());
export { IonBottomDrawerComponent };
function IonBottomDrawerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    IonBottomDrawerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    IonBottomDrawerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    IonBottomDrawerComponent.propDecorators;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.dockedHeight;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.shouldBounce;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.distanceTop;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.transition;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.state;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.minimumHeight;
    /** @type {?} */
    IonBottomDrawerComponent.prototype.stateChange;
    /** @type {?} */
    IonBottomDrawerComponent.prototype._startPositionTop;
    /** @type {?} */
    IonBottomDrawerComponent.prototype._BOUNCE_DELTA;
    /** @type {?} */
    IonBottomDrawerComponent.prototype._element;
    /** @type {?} */
    IonBottomDrawerComponent.prototype._renderer;
    /** @type {?} */
    IonBottomDrawerComponent.prototype._domCtrl;
    /** @type {?} */
    IonBottomDrawerComponent.prototype._platform;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJvdHRvbS1kcmF3ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb24tYm90dG9tLWRyYXdlci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvaW9uLWJvdHRvbS1kcmF3ZXIvaW9uLWJvdHRvbS1kcmF3ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQTRCM0Msa0NBQ1UsVUFDQSxXQUNBLFVBQ0E7UUFIQSxhQUFRLEdBQVIsUUFBUTtRQUNSLGNBQVMsR0FBVCxTQUFTO1FBQ1QsYUFBUSxHQUFSLFFBQVE7UUFDUixjQUFTLEdBQVQsU0FBUzs0QkFyQmEsRUFBRTs0QkFFRCxJQUFJOzJCQUVOLENBQUM7MEJBRUYsbUJBQW1CO3FCQUVuQixXQUFXLENBQUMsTUFBTTs2QkFFZixDQUFDOzJCQUVpQixJQUFJLFlBQVksRUFBZTs2QkFHakQsRUFBRTtLQU85Qjs7OztJQUVMLGtEQUFlOzs7SUFBZjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsdURBQXVELENBQUMsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEosSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMscUJBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxH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QUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2hHLENBQUMsQ0FBQzs7O2dCQXpJTixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHVIQUdYO29CQUNDLE1BQU0sRUFBRSxDQUFDLG1LQUFtSyxDQUFDO2lCQUM5Szs7OztnQkFaMEIsVUFBVTtnQkFBRSxTQUFTO2dCQUM3QixhQUFhO2dCQUF2QixRQUFROzs7aUNBYWQsS0FBSztpQ0FFTCxLQUFLO2dDQUVMLEtBQUs7K0JBRUwsS0FBSzswQkFFTCxLQUFLO2tDQUVMLEtBQUs7Z0NBRUwsTUFBTTs7bUNBMUJUOztTQWFhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhdGZvcm0sIERvbUNvbnRyb2xsZXIgfSBmcm9tICdpb25pYy1hbmd1bGFyJztcblxuaW1wb3J0IHsgRHJhd2VyU3RhdGUgfSBmcm9tICcuL2RyYXdlci1zdGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1ib3R0b20tZHJhd2VyJyxcbiAgdGVtcGxhdGU6IGA8aW9uLWNvbnRlbnQgY2xhc3M9XCJpb24tYm90dG9tLWRyYXdlci1zY3JvbGxhYmxlLWNvbnRlbnRcIiBuby1ib3VuY2U+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvaW9uLWNvbnRlbnQ+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7ei1pbmRleDoxMSFpbXBvcnRhbnQ7YmFja2dyb3VuZC1jb2xvcjojZmZmOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwdmgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMHZoKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBJb25Cb3R0b21EcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkb2NrZWRIZWlnaHQ6IG51bWJlciA9IDUwO1xuXG4gIEBJbnB1dCgpIHNob3VsZEJvdW5jZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgZGlzdGFuY2VUb3A6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KCkgdHJhbnNpdGlvbjogc3RyaW5nID0gJzAuMjVzIGVhc2UtaW4tb3V0JztcblxuICBASW5wdXQoKSBzdGF0ZTogRHJhd2VyU3RhdGUgPSBEcmF3ZXJTdGF0ZS5Cb3R0b207XG5cbiAgQElucHV0KCkgbWluaW11bUhlaWdodDogbnVtYmVyID0gMDtcblxuICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEcmF3ZXJTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERyYXdlclN0YXRlPigpO1xuXG4gIHByaXZhdGUgX3N0YXJ0UG9zaXRpb25Ub3A6IG51bWJlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfQk9VTkNFX0RFTFRBID0gMzA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2RvbUN0cmw6IERvbUNvbnRyb2xsZXIsXG4gICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtXG4gICkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW9uLWJvdHRvbS1kcmF3ZXItc2Nyb2xsYWJsZS1jb250ZW50IC5zY3JvbGwtY29udGVudCcpLCAndG91Y2gtYWN0aW9uJywgJ25vbmUnKTtcbiAgICB0aGlzLl9zZXREcmF3ZXJTdGF0ZSh0aGlzLnN0YXRlKTtcblxuICAgIGNvbnN0IGhhbW1lciA9IG5ldyBIYW1tZXIodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICBoYW1tZXIuZ2V0KCdwYW4nKS5zZXQoeyBlbmFibGU6IHRydWUsIGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9WRVJUSUNBTCB9KTtcbiAgICBoYW1tZXIub24oJ3BhbiBwYW5zdGFydCBwYW5lbmQnLCAoZXY6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChldi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3BhbnN0YXJ0JzpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVQYW5TdGFydCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYW5lbmQnOlxuICAgICAgICAgIHRoaXMuX2hhbmRsZVBhbkVuZChldik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5faGFuZGxlUGFuKGV2KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIWNoYW5nZXMuc3RhdGUpIHJldHVybjtcbiAgICB0aGlzLl9zZXREcmF3ZXJTdGF0ZShjaGFuZ2VzLnN0YXRlLmN1cnJlbnRWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXREcmF3ZXJTdGF0ZShzdGF0ZTogRHJhd2VyU3RhdGUpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgdGhpcy50cmFuc2l0aW9uKTtcbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICBjYXNlIERyYXdlclN0YXRlLkJvdHRvbTpcbiAgICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSgnY2FsYygxMDB2aCAtICcgKyB0aGlzLm1pbmltdW1IZWlnaHQgKyAncHgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ6XG4gICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoKHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpIC0gdGhpcy5kb2NrZWRIZWlnaHQpICsgJ3B4Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSh0aGlzLmRpc3RhbmNlVG9wICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlUGFuU3RhcnQoKSB7XG4gICAgdGhpcy5fc3RhcnRQb3NpdGlvblRvcCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVQYW5FbmQoZXYpIHtcbiAgICBpZiAodGhpcy5zaG91bGRCb3VuY2UgJiYgZXYuaXNGaW5hbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICBjYXNlIERyYXdlclN0YXRlLkRvY2tlZDpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVEb2NrZWRQYW5FbmQoZXYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERyYXdlclN0YXRlLlRvcDpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVUb3BQYW5FbmQoZXYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuX2hhbmRsZUJvdHRvbVBhbkVuZChldik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRvcFBhbkVuZChldikge1xuICAgIGlmIChldi5kZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkodGhpcy5kaXN0YW5jZVRvcCArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZURvY2tlZFBhbkVuZChldikge1xuICAgIGNvbnN0IGFic0RlbHRhWSA9IE1hdGguYWJzKGV2LmRlbHRhWSlcbiAgICBpZiAoYWJzRGVsdGFZID4gdGhpcy5fQk9VTkNFX0RFTFRBICYmIGV2LmRlbHRhWSA8IDApIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Ub3A7XG4gICAgfSBlbHNlIGlmIChhYnNEZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEgJiYgZXYuZGVsdGFZID4gMCkge1xuICAgICAgdGhpcy5zdGF0ZSA9IERyYXdlclN0YXRlLkJvdHRvbVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKCh0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSAtIHRoaXMuZG9ja2VkSGVpZ2h0KSArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUJvdHRvbVBhbkVuZChldikge1xuICAgIGlmICgtZXYuZGVsdGFZID4gdGhpcy5fQk9VTkNFX0RFTFRBKSB7XG4gICAgICB0aGlzLnN0YXRlID0gRHJhd2VyU3RhdGUuRG9ja2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKCdjYWxjKDEwMHZoIC0gJyArIHRoaXMubWluaW11bUhlaWdodCArICdweCknKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVQYW4oZXYpIHtcbiAgICBjb25zdCBwb2ludGVyWSA9IGV2LmNlbnRlci55O1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCAnbm9uZScpO1xuICAgIGlmIChwb2ludGVyWSA+IDAgJiYgcG9pbnRlclkgPCB0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSkge1xuICAgICAgaWYgKGV2LmFkZGl0aW9uYWxFdmVudCA9PT0gJ3BhbnVwJyB8fCBldi5hZGRpdGlvbmFsRXZlbnQgPT09ICdwYW5kb3duJykge1xuICAgICAgICBjb25zdCBuZXdUb3AgPSB0aGlzLl9zdGFydFBvc2l0aW9uVG9wICsgZXYuZGVsdGFZO1xuICAgICAgICBpZiAobmV3VG9wID49IHRoaXMuZGlzdGFuY2VUb3ApIHRoaXMuX3NldFRyYW5zbGF0ZVkobmV3VG9wICsgJ3B4Jyk7XG4gICAgICAgIGVsc2UgaWYgKG5ld1RvcCA8IHRoaXMuZGlzdGFuY2VUb3ApIHRoaXMuX3NldFRyYW5zbGF0ZVkodGhpcy5kaXN0YW5jZVRvcCArICdweCcpO1xuICAgICAgICBpZiAobmV3VG9wID4gdGhpcy5fcGxhdGZvcm0uaGVpZ2h0KCkgLSB0aGlzLm1pbmltdW1IZWlnaHQpIHRoaXMuX3NldFRyYW5zbGF0ZVkoKHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpIC0gdGhpcy5taW5pbXVtSGVpZ2h0KSArICdweCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldFRyYW5zbGF0ZVkodmFsdWUpIHtcbiAgICB0aGlzLl9kb21DdHJsLndyaXRlKCgpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKCcgKyB2YWx1ZSArICcpJyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==