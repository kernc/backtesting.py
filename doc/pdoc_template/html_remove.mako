<%!
    # Template configuration
    html_lang = 'en'
    show_inherited_members = False
    extract_module_toc_into_sidebar = True
    list_class_variables_in_index = True
%>
<%
  import pdoc
  from pdoc.html_helpers import extract_toc, glimpse, to_html as _to_html


  def link(d, name=None, fmt='{}'):
    name = fmt.format(name or d.qualname + ('()' if isinstance(d, pdoc.Function) else ''))
    if not isinstance(d, pdoc.Doc) or isinstance(d, pdoc.External) and not external_links:
        return name
    url = d.url(relative_to=module, link_prefix=link_prefix)
    return '<a title="{}" href="{}">{}</a>'.format(d.refname, url, name)


  def to_html(text):
    return _to_html(text, module=module, link=link)
%>

<%def name="ident(name)"><span class="ident">${name}</span></%def>

<%def name="show_source(d)">
    % if show_source_code and d.source:
        <details class="source">
            <summary>Source code</summary>
            <pre><code class="python">${d.source | h}}</code></pre>
        </details>
    %endif
</%def>

<%def name="show_desc(d, short=False)">
  <%
  inherits = (' class="inherited"'
              if d.inherits and (not d.docstring or d.docstring == d.inherits.docstring) else
              '')
  docstring = d.inherits.docstring if inherits else d.docstring
  if short:
    docstring = glimpse(docstring, 180, paragraph=False)
  %>
  % if d.inherits:
      <p class="inheritance">
          <em>Inherited from:</em>
          % if hasattr(d.inherits, 'cls'):
              <code>${link(d.inherits.cls)}</code>.<code>${link(d.inherits, d.name)}</code>
          % else:
              <code>${link(d.inherits)}</code>
          % endif
      </p>
  % endif
  <div${inherits}>${docstring | to_html}</div>
  % if not isinstance(d, pdoc.Module):
  ${show_source(d)}
  % endif
</%def>

<%def name="show_module_list(modules)">
<h1>Python module list</h1>

% if not modules:
  <p>No modules found.</p>
% else:
  <dl id="http-server-module-list">
  % for name, desc in modules:
      <div class="flex">
      <dt><a href="${link_prefix}${name}">${name}</a></dt>
      <dd>${desc | glimpse, to_html}</dd>
      </div>
  % endfor
  </dl>
% endif
</%def>

<%def name="show_column_list(items)">
  <ul class="${'two-column' if len(items) >= 6 else ''}">
  % for item in items:
    <li><code>${link(item, item.name)}</code></li>
  % endfor
  </ul>
</%def>

<%def name="show_module(module)">
  <%
  variables = module.variables()
  classes = module.classes()
  functions = module.functions()
  submodules = module.submodules()
  %>

  <%def name="show_func(f)">
    <dt id="${f.refname}"><code class="name flex">
        <span>${f.funcdef()} ${ident(f.name)}</span>(<span>${', '.join(f.params()) | h})</span>
    </code></dt>
    <dd>${show_desc(f)}</dd>
  </%def>

  <header>
  % if 'http_server' in context.keys():
    <nav class="http-server-breadcrumbs">
      <a href="/">All packages</a>
      <% parts = module.name.split('.')[:-1] %>
      % for i, m in enumerate(parts):
        <% parent = '.'.join(parts[:i+1]) %>
        :: <a href="/${parent.replace('.', '/')}/">${parent}</a>
      % endfor
    </nav>
  % endif
  <h1 class="title"><code>${module.name}</code> module</h1>
  </header>

  <section id="section-intro">
  ${module.docstring | to_html}
  ${show_source(module)}
  </section>

  <section>
    % if submodules:
    <h2 class="section-title" id="header-submodules">Sub-modules</h2>
    <dl>
    % for m in submodules:
      <dt><code class="name">${link(m)}</code></dt>
      <dd>${show_desc(m, short=True)}</dd>
    % endfor
    </dl>
    % endif
  </section>

  <section>
    % if variables:
    <h2 class="section-title" id="header-variables">Global variables</h2>
    <dl>
    % for v in variables:
      <dt id="${v.refname}"><code class="name">var ${ident(v.name)}</code></dt>
      <dd>${show_desc(v)}</dd>
    % endfor
    </dl>
    % endif
  </section>

  <section>
    % if functions:
    <h2 class="section-title" id="header-functions">Functions</h2>
    <dl>
    % for f in functions:
      ${show_func(f)}
    % endfor
    </dl>
    % endif
  </section>

  <section>
    % if classes:
    <h2 class="section-title" id="header-classes">Classes</h2>
    <dl>
    % for c in classes:
      <%
      class_vars = c.class_variables(show_inherited_members)
      smethods = c.functions(show_inherited_members)
      inst_vars = c.instance_variables(show_inherited_members)
      methods = c.methods(show_inherited_members)
      mro = c.mro()
      subclasses = c.subclasses()
      %>
      <dt id="${c.refname}"><code class="flex name class">
          <span>class ${ident(c.name)}</span>
          % if mro:
              <span>(</span><span><small>ancestors:</small> ${', '.join(link(cls) for cls in mro)})</span>
          %endif
      </code></dt>

      <dd>${show_desc(c)}

      % if subclasses:
          <h3>Subclasses</h3>
          <ul class="hlist">
          % for sub in subclasses:
              <li>${link(sub)}</li>
          % endfor
          </ul>
      % endif
      % if class_vars:
          <h3>Class variables</h3>
          <dl>
          % for v in class_vars:
              <dt id="${v.refname}"><code class="name">var ${ident(v.name)}</code></dt>
              <dd>${show_desc(v)}</dd>
          % endfor
          </dl>
      % endif
      % if smethods:
          <h3>Static methods</h3>
          <dl>
          % for f in smethods:
              ${show_func(f)}
          % endfor
          </dl>
      % endif
      % if inst_vars:
          <h3>Instance variables</h3>
          <dl>
          % for v in inst_vars:
              <dt id="${v.refname}"><code class="name">var ${ident(v.name)}</code></dt>
              <dd>${show_desc(v)}</dd>
          % endfor
          </dl>
      % endif
      % if methods:
          <h3>Methods</h3>
          <dl>
          % for f in methods:
              ${show_func(f)}
          % endfor
          </dl>
      % endif

      % if not show_inherited_members:
          <%
              members = c.inherited_members()
          %>
          % if members:
              <h3>Inherited members</h3>
              <ul class="hlist">
              % for cls, mems in members:
                  <li><code><b>${link(cls)}</b></code>:
                      <ul class="hlist">
                          % for m in mems:
                              <li><code>${link(m, name=m.name)}</code></li>
                          % endfor
                      </ul>

                  </li>
              % endfor
              </ul>
          % endif
      % endif

      </dd>
    % endfor
    </dl>
    % endif
  </section>
</%def>

<%def name="module_index(module)">
  <%
  variables = module.variables()
  classes = module.classes()
  functions = module.functions()
  submodules = module.submodules()
  supermodule = module.supermodule
  %>
  <nav id="sidebar">
    <header>
        <a class="homelink" rel="home" title="Backtesting.py home" href="/backtesting.py/">
            <img src="/backtesting.py/logo.png" alt=""> Backtesting.py
        </a>
    </header>
    <h1>Index</h1>
    ${extract_toc(module.docstring) if extract_module_toc_into_sidebar else ''}
    <ul id="index">
    % if supermodule:
    <li><h3>Super-module</h3>
      <ul>
        <li><code>${link(supermodule)}</code></li>
      </ul>
    </li>
    % endif

    % if submodules:
    <li><h3><a href="#header-submodules">Sub-modules</a></h3>
      <ul>
      % for m in submodules:
        <li><code>${link(m)}</code></li>
      % endfor
      </ul>
    </li>
    % endif

    % if variables:
    <li><h3><a href="#header-variables">Global variables</a></h3>
      ${show_column_list(variables)}
    </li>
    % endif

    % if functions:
    <li><h3><a href="#header-functions">Functions</a></h3>
      ${show_column_list(functions)}
    </li>
    % endif

    % if classes:
    <li><h3><a href="#header-classes">Classes</a></h3>
      <ul>
      % for c in classes:
        <li>
        <h4><code>${link(c)}</code></h4>
        <%
            members = c.functions() + c.methods()
            if list_class_variables_in_index:
                members += c.instance_variables() + c.class_variables()
            if not show_inherited_members:
                members = [i for i in members if not i.inherits]
            members = sorted(members)
        %>
        % if members:
          ${show_column_list(members)}
        % endif
        </li>
      % endfor
      </ul>
    </li>
    % endif

    </ul>
  </nav>
</%def>

<!doctype html>
<html lang="${html_lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

<%
    module_list = 'modules' in context.keys()  # Whether we're showing module list in server mode
%>

  % if module_list:
    <title>Python module list</title>
    <meta name="description" content="A list of documented Python modules." />
  % else:
    <title>${module.name} API documentation</title>
    <meta name="description" content="${module.docstring | glimpse, trim, h}" />
  % endif

  <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css' rel='stylesheet'>
  <link href='https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/8.0.0/sanitize.min.css' rel='stylesheet'>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css" rel="stylesheet">
  <script>window.dataLayer=[['js',new Date()],['config','UA-43663477-4']]</script>
  <script async src='https://www.googletagmanager.com/gtag/js?id=UA-43663477-4'></script>

  <%namespace name="css" file="css.mako" />
  <style>${css.mobile()}</style>
  <style media="screen and (min-width: 700px)">${css.desktop()}</style>
  <style media="print">${css.print()}</style>

  <%namespace name="custom_css" file="custom_css.mako" />
  <style>${custom_css.homelink()}</style>

</head>
<body>
<main>
  % if module_list:
    <article id="content">
      ${show_module_list(modules)}
    </article>
  % else:
    <article id="content">
      ${show_module(module)}
    </article>
    ${module_index(module)}
  % endif
</main>

<footer id="footer">
    <p>Generated by <a href="https://github.com/kernc/pdoc">pdoc ${pdoc.__version__}</a></p>. 卐
</footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <script>hljs.configure({languages: ['python']}); hljs.initHighlightingOnLoad()</script>
</body>
</html>
