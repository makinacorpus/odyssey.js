{% set cfg = opts['ms_project'] %}
{% set data = cfg.data %}
{% set name = cfg.name %}

{% set path = ('{data[js_dir]}/node_modules/.bin:'
               '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:'
               '/sbin:/bin:/usr/games:/usr/local/games').format(**cfg) %}

include:
  - makina-states.localsettings.nodejs
  - makina-states.localsettings.npm

{% macro node_run(id, require=None) %}
{{id}}:
  cmd.run:
    - watch:
      {% if require %}
      {% for i in require %}
      - {{i}}
      {%endfor%}
      {%endif%}
      - mc_proxy: nodejs-post-prefix-install
    - cwd: "{{data.js_dir}}"
    - user: {{cfg.user}}
    - unless: test ! -e "{{data.get('js_dir', '/dev/nonexisting')}}"
    - use_vt: true
    - env:
        PATH: "{{path}}"
{% endmacro %}


{{node_run('{name}-i'.format(**cfg))}}
    - name: npm install
    {% if not data.get('build', True ) %}
    - onlyif: /bin/false
    {% endif %}

{{node_run('{name}-js'.format(**cfg), ['cmd: {name}-i'.format(**cfg)])}}
    - name: make clean all
    {% if not data.get('build', True ) %}
    - onlyif: /bin/false
    {% endif %}
