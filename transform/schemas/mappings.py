# TODO refactor and move all of below to dedicated mapping folder
"""Define mappings"""

# Values are mapped to the keys

# Access rights mapping
OPEN_ACCESS_ = "Open access"
RESTRICTED = "Restricted"
ORDER_REQUIRED = "Order required"
LOGIN_REQUIRED = "Login required"
LOGIN_REQUIRED_ON = (
    "Login required on EOSC Pillar, open access on the original resource page"
)
CLOSED = "Closed"
EMBARGO = "Embargo"
OTHER = "Other"
access_rights_mapping = {
    OPEN_ACCESS_: (
        "OPEN",
        "open_access",
        "Open Access",
        "fully_open_access",
        "open access",
        "free access",
        "free access ",
        "tr_access_right-open_access",
    ),
    RESTRICTED: ("RESTRICTED",),
    ORDER_REQUIRED: ("order_required",),
    LOGIN_REQUIRED: ("login required",),
    LOGIN_REQUIRED_ON: (
        "login required on EOSC Pillar, open access on the original resource page",
    ),
    CLOSED: ("CLOSED",),
    EMBARGO: ("EMBARGO",),
    OTHER: ("other",),
}

# Publisher mapping
ZENODO = "Zenodo"
FIGSHARE = "Figshare"
publisher_mapping = {
    ZENODO: "ZENODO",
    FIGSHARE: "figshare",
}

# Unified categories mapping
OAG_UNI_CAT = "Discover Research Outputs"
TRAIN_UNI_CAT = "Access Training Material"
unified_categories_mapping = {
    OAG_UNI_CAT: ("dataset", "publication", "software", "other"),
    TRAIN_UNI_CAT: ("training",),
}

# Language mapping
NOT_SPECIFIED = "Not specified"
ENGLISH = "English"
SPANISH = "Spanish"
ALBANIAN = "Albanian"
ARMENIAN = "Armenian"
BOSNIAN = "Bosnian"
BULGARIAN = "Bulgarian"
CROATIAN = "Croatian"
GREEK = "Greek"
HUNGARIAN = "Hungarian"
GEORGIAN = "Georgian"
MACEDONIAN = "Macedonian"
ROMANIAN = "Romanian"
SERBIAN = "Serbian"
SLOVENIAN = "Slovenian"
language_mapping = {
    NOT_SPECIFIED: (
        "undetermined",
        "unknown",
        "null",
    ),
    ENGLISH: "en",
    SPANISH: "es",
    ALBANIAN: "sq",
    ARMENIAN: "hy",
    BOSNIAN: "bs",
    BULGARIAN: "bg",
    CROATIAN: "hr",
    GREEK: "el",
    HUNGARIAN: "hu",
    GEORGIAN: "ka",
    MACEDONIAN: "mk",
    ROMANIAN: "ro",
    SERBIAN: "sr",
    SLOVENIAN: "sl",
}
