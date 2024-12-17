MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
STATIC := static
SASS := sass --no-source-map main.scss:$(TAR)/main.css
DENO := deno run -A --no-check

$(info $(OS))

watch: clean
	$(PAR) styles_w srv_w live

build: clean all

all:
	$(PAR) styles html cp

styles_w:
	$(SASS) --watch

styles:
	$(SASS)

live:
	$(DENO) live.mjs

srv_w:
	$(DENO) --watch srv.mjs --dev

html:
	$(DENO) html.mjs

cp:
ifeq ($(OS), L)
	if not exist "$(TAR)" mkdir "$(TAR)"
	copy /y "$(STATIC)"\* "$(TAR)" >nul
else
	mkdir -p "$(TAR)"
	rsync -av --include='.well-known/' --include='.well-known/***' --exclude='.*' "$(STATIC)/" "$(TAR)/"
endif
# cp:
# ifeq ($(OS), L)
# 	if not exist "$(TAR)" mkdir "$(TAR)"
# 	copy /y "$(STATIC)"\* "$(TAR)" >nul
# else
# 	mkdir -p "$(TAR)"
# 	cp -r "$(STATIC)"/* "$(TAR)"
# endif

clean:
ifeq ($(OS), L)
	if exist "$(TAR)" rmdir /s /q "$(TAR)"
else
	rm -rf "$(TAR)"
endif

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass deno
else
	brew install -q sass/sass/sass deno
endif
