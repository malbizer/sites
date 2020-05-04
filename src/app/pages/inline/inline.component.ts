import { Component, OnInit } from '@angular/core';
import * as vivus from 'vivus';

var MAX = 3;

@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss']
})
export class InlineComponent implements OnInit {
  public item = ""
  public itens = ["Sites", "Aplicativos", "Sistemas de Gerenciamento", "Sistemas para IoT"]
  public pause = false;
  public roll = false;
  public select = "defines";
  public svg: vivus;
  public urlsvg = "../../../assets/animations/";
  public svglist = ['tec5.svg', 'tec2.svg', 'tec3.svg', 'tec4.svg'];
  public svgset = 0;

  public tile = 1;

  constructor() {
    // this.item = this.itens[0]
    let i = 0;
    let j = 0;
    let fw = true;
    let timer = setInterval(async () => {
      if (!this.pause) {
        if (fw) {
          this.item += this.itens[j][i];
          i++;
          if (i > this.itens[j].length - 1) {
            fw = false;
            this.pausar(4000);
          }
        } else {
          i--;
          this.item = this.item.substring(0, i);
          if (i == 0) {
            fw = true;
            j++;
            this.item = "";
            if (j >= this.itens.length) j = 0;
          }
        }
      }
    }, 100);
  }

  // ngAfterViewInit() {
  //   this.play()
  // }

  async pausar(ms) {
    this.pause = true;
    await this.sleep(ms);
    this.pause = false;
  }

  go(tag) {
    document.getElementById(tag).scrollIntoView();
    this.select = tag;
    this.svg
      .play(1)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.changesvg();
      document.addEventListener('scroll', (evt) => {
        if (window.pageYOffset > 53 && !this.roll) {
          document.getElementById("top").classList.add("roll");
          document.getElementById("top").classList.remove("unroll");
          document.getElementById("top").style.display = 'none';
          setTimeout(() => {
            document.getElementById("top").style.display = 'block';
          }, 10);
          this.roll = true;
        }

        if (window.pageYOffset <= 53 && this.roll) {
          document.getElementById("top").classList.add("unroll");
          document.getElementById("top").classList.remove("roll");
          document.getElementById("top").style.display = 'none';
          setTimeout(() => {
            document.getElementById("top").style.display = 'block';
          }, 10);
          this.roll = false;
        }
      })
    }, 200);

  }

  public animate() {
    try {
      let d = setInterval(async () => {
        if (this.svg.getStatus() == 'end') {
          clearInterval(d);
          await this.sleep(3000);
          this.svg.play(-1);
          await this.sleep(2000);
          this.svgset++;
          if (this.svgset >= this.svglist.length) this.svgset = 0;
          this.changesvg();
        }
      }, 100);
    }
    catch{
      console.log('Vivus em andamento...');

    }
  }

  goLink(link) {
    window.open(link, "_blank")
  }

  public changesvg() {
    console.log(this.svgset);

    document.getElementById("mysvg").setAttribute('data', this.urlsvg + this.svglist[this.svgset]);
    document.getElementById("mysvg").style.display = 'none'
    setTimeout(() => {
      this.play();
      document.getElementById("mysvg").style.display = 'block'
      this.svg.reset()
        .play(1);
      this.animate();
    }, 900);
  }

  public sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public play() {
    this.svg = new vivus('mysvg',
      {
        type: 'oneByOne',
        duration: 100,
        start: 'autostart',
        dashGap: 2,
        forceRender: false,
      });
  }

  next() {
    const anterior = document.getElementById('t' + (this.tile ));
    this.tile++;
    if (this.tile > MAX) this.tile = 1;
    const atual = document.getElementById('t' + (this.tile));
    anterior.style.display = "none";
    atual.style.display = "block"
  }

  return() {
    const anterior = document.getElementById('t' + (this.tile ));
    this.tile--;
    if (this.tile < 1) this.tile = MAX;
    const atual = document.getElementById('t' + (this.tile));
    anterior.style.display = "none";
    atual.style.display = "block"
  }

}
