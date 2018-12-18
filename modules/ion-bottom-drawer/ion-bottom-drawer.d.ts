import { ElementRef, Renderer2, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Platform, DomController } from 'ionic-angular';
import { DrawerState } from './drawer-state';
export declare class IonBottomDrawerComponent implements AfterViewInit, OnChanges {
    private _element;
    private _renderer;
    private _domCtrl;
    private _platform;
    dockedHeight: number;
    shouldBounce: boolean;
    distanceTop: number;
    transition: string;
    state: DrawerState;
    minimumHeight: number;
    stateChange: EventEmitter<DrawerState>;
    private _startPositionTop;
    private readonly _BOUNCE_DELTA;
    constructor(_element: ElementRef, _renderer: Renderer2, _domCtrl: DomController, _platform: Platform);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _setDrawerState(state);
    private _handlePanStart();
    private _handlePanEnd(ev);
    private _handleTopPanEnd(ev);
    private _handleDockedPanEnd(ev);
    private _handleBottomPanEnd(ev);
    private _handlePan(ev);
    private _setTranslateY(value);
}
