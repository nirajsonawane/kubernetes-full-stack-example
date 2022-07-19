{{/* generate labels for api */}}
{{- define "common.api" -}}
app: student-app-api
{{- end }}

{{/* generate labels for client */}}
{{- define "common.client" -}}
app: student-app-client
{{- end }}

{{/* generate basic labels */}}
{{- define "common.mongo" -}}
app: mongo
{{- end }}
