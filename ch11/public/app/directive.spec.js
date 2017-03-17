System.register(["@angular/core", "@angular/core/testing", "@angular/platform-browser"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, testing_1, platform_browser_1, TestComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }
        ],
        execute: function () {
            TestComponent = (function () {
                function TestComponent() {
                    this.shouldShow = true;
                }
                return TestComponent;
            }());
            TestComponent = __decorate([
                core_1.Component({
                    template: "<ul>\n    <li *ngIf=\"shouldShow\" name=\"One\">1</li>\n    <li *ngIf=\"!shouldShow\" name=\"Two\">2</li>\n  </ul>"
                })
            ], TestComponent);
            describe('ngIf tests', function () {
                var componentFixture;
                beforeEach(function () {
                    componentFixture = testing_1.TestBed.configureTestingModule({
                        declarations: [TestComponent]
                    }).createComponent(TestComponent);
                });
                it('It should render the list properly', function () {
                    componentFixture.detectChanges();
                    var listItems = componentFixture.debugElement.queryAll(platform_browser_1.By.css('li'));
                    expect(listItems.length).toBe(1);
                    expect(listItems[0].attributes['name']).toBe('One');
                });
                it('It should rerender the list properly', function () {
                    componentFixture.componentInstance.shouldShow = false;
                    componentFixture.detectChanges();
                    var listItems = componentFixture.debugElement.queryAll(platform_browser_1.By.css('li'));
                    expect(listItems.length).toBe(1);
                    expect(listItems[0].attributes['name']).toBe('Two');
                });
            });
        }
    };
});
//# sourceMappingURL=directive.spec.js.map