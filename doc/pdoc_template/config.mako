<%!
    html_lang = 'en'
    show_inherited_members = False
    extract_module_toc_into_sidebar = True
    list_class_variables_in_index = True
    sort_identifiers = True
    show_type_annotations = False
    show_source_code = False
    google_search_query = '''
        inurl:kernc.github.io/backtesting.py
        inurl:github.com/kernc/backtesting.py
    '''


    from pdoc.html_helpers import glimpse as _glimpse

    # Make visible the code block from the first paragraph of the
    # `backtesting.backtesting` module
    def glimpse(text, *args, **kwargs):
        return _glimpse(text, max_length=180, paragraph=False)
%>
