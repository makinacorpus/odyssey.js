{% import "makina-states/services/http/nginx/init.sls" as nginx %}
{% set cfg = opts.ms_project %}
{% set data = cfg.data %}

include:
  - makina-states.services.http.nginx

{{cfg.name}}-docroot:
  file.directory:
    - name: {{data.doc_root}}
    - user: {{cfg.user}}
    - group: {{cfg.group}}
    - mode: 750
  cmd.run:
    - name: |
            set -e
            for i in sandbox vendor dist;do
            rsync -Aa --delete "{{cfg.project_root}}/${i}/" "{{data.doc_root}}/${i}"
            done
    - user: {{cfg.user}}
    - watch:
      - file: {{cfg.name}}-docroot
    - watch_in:
      - mc_proxy: nginx-pre-conf-hook

# inconditionnaly reboot nginx upon deployments
/bin/true:
  cmd.run:
    - watch_in:
      - mc_proxy: nginx-pre-conf-hook

{{ nginx.virtualhost(domain=data.domain,
                     vhost_basename="corpus-"+cfg.name,
                     doc_root=data.doc_root,
                     server_aliases=data.server_aliases,
                     vh_top_source=data.nginx_top,
                     vh_content_source=data.nginx_vhost,
                     project=cfg.name)}}
