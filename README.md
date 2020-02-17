This project implements a custom angular 9 setup using pug templates and points out a problem when projects use the AngularCompilerPlugin directly with custom loaders.

The implementation is for demonstration purposes only. This is not a bullet proof setup.

#Setup

```
git clone git@github.com:giniedp/angular-9-custom-pug-setup.git
cd angular-9-custom-pug-setup
yarn install
```

#Commands

run `yarn build:custom` to build the project with custom pipeline

run `yarn build:custom --aot` to build the project with custom pipeline and AOT enabled

run `yarn serve:custom` to serve the compiled application (should be available at http://localhost:8000)

#Problem

Running `yarn build:custom` produces the following error

```
  ERROR in Errors parsing template: Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.) ("h1 {{ title }}
  input([(ngModel)]="title", [ngModelOptions]="{ standalone: true }")
  router-outlet()
  [ERROR ->]"): /Users/alex/repositories/ginie/my-app/src/app/app.component.pug@3:0, Invalid ICU message. Missing '}'. ("h1 {{ title }}
  input([(ngModel)]="title", [ngModelOptions]="{ standalone: true }")
  router-outlet()
  [ERROR ->]"): /Users/alex/repositories/ginie/my-app/src/app/app.component.pug@3:0
```

This indicates that the template is processed before the pug is compiled to html meaning that the following webpack rule was not applied

```json
{
  test: /\.(pug)$/,
  use: [{ loader: "apply-loader" }, { loader: "pug-loader" }]
},
```
