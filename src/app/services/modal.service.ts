import {
  ApplicationRef,
  ComponentRef, createComponent,
  EnvironmentInjector,
  Injectable,
  Type,
  ViewContainerRef
} from "@angular/core";
import {ModalComponent} from "../components/modal/modal.component";

export interface Options {
  animations?: {
    modal?: {
      enter?: string;
      leave?: string;
    };
    overlay?: {
      enter?: string;
      leave?: string;
    };
  };
  size?: {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
  };
  events?: {
    onSuccess: (data: any) => void;
    onClose: () => void;
  },
  data?: any;
}

export interface ModalContent {
  options?: Options;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  newModalComponent!: ComponentRef<ModalComponent>;
  options!: Options | undefined;
  constructor( private appRef: ApplicationRef,
               private injector: EnvironmentInjector) { }

  open<C>(vcrOrComponent: Type<C>, options?: {
    data?: any;
    size: { width: string };
    animations: { overlay: { leave: string; enter: string }; modal: { leave: string; enter: string } };
    events: { onSuccess: (data: any) => void; onClose: () => void; }
  }): void;

  open<C extends ModalContent>(
    vcrOrComponent: ViewContainerRef | Type<C>,
    options?: Options
  ) {
    this.options = options as Options | undefined;
    this.openWithComponent(vcrOrComponent as Type<C>);
  }

  private openWithComponent<C extends ModalContent>(component: Type<C>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });
    newComponent.instance.options = this.options;
    console.log('newComponent', newComponent);
    this.newModalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });
    document.body.appendChild(this.newModalComponent.location.nativeElement);
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
  }
}
