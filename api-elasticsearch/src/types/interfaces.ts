export interface iHelloWorld {
    greeting: string
}

export interface iElasticApiSearchUrl {
    url: 'https://search.instar.wiki/cgi_interface/_search?q=' | 'https://search.instar.wiki/fw_changelog/_search?q='
}

interface iElasticSearchShards {
    total: number
    successful: number
    skipped: number
    failed: number
}

interface iElasticSearchHitsTotal {
    value: number,
    relation: 'eq' | 'gte'
}

interface iElasticSearchCGIPerm {
    get: string[]
    set: string[]
}

interface iElasticSearchCGILang {
    en: string
    de: string
}

interface iElasticSearchCGIParam {
    param: string
    val: string
    description: iElasticSearchCGILang
    cgi: string
    mqtt: string
}

interface iElasticSearchCGI {
    title: string
    series: ("1440p" | "2560p")[]
    type: string[]
    cgi: string
    date_created: string
    date_modified: string
    permissions: iElasticSearchCGIPerm
    abstract: iElasticSearchCGILang
    chapter: iElasticSearchCGILang
    link: iElasticSearchCGILang
    tags: string[]
    image: string
    imagesquare: string
    description: iElasticSearchCGILang
    parameters: iElasticSearchCGIParam[]
}

interface iElasticSearchHitsHits {
    _index: string,
    _id: string,
    _score: number,
    _ignored: string[],
    _source: iElasticSearchCGI
}

interface iElasticSearchHits {
    total: iElasticSearchHitsTotal,
    max_score: number
    hits: iElasticSearchHitsHits[]
}


export interface iElasticSearchResponse {
    took: number
    timed_out: boolean
    _shards:iElasticSearchShards
    hits: iElasticSearchHits
}