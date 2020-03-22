### File Operation Sample

This demo indicates NJS' file operation ability.

Simple GET: 

```
$ curl -X GET http://localhost:8096

{
    "strategy": {
        "author": "山梨广一",
        "description": "战略构建的6个基本步骤",
        "pages": 228,
        "price": 52,
        "publish": "2014-02",
        "title": "简明战略"
    },
    "diff_workforce": {
        "author": [
            "布莱恩",
            "马克",
            "查理德"
        ],
        "description": "如何让人才转化为战略影响力",
        "pages": 245,
        "price": 59.9,
        "publish": "2016-03",
        "title": "重新定义人才"
    },
    "survial_guide": {
        "author": "埃德加.沙因",
        "description": "变革时代的企业文化之道",
        "pages": 243,
        "price": 59.9,
        "publish": "2017-01",
        "title": "企业文化生存与变革指南"
    }
}
```

Simple POST: 

```
curl -X POST 'http://localhost:8096' \
--header 'Content-Type: application/json' \
-d '{
    "performance": {
        "author": "约翰 惠特默",
        "description": "The principles and practice of coaching and leadership.",
        "pages": 259,
        "price": 79,
        "publish": "2019-12",
        "title": "高绩效教练"
    }
}'
```

After the `POST`, a new item is registered.

#### Description for this usecase

* The posted information is checked as json format, reported if invalid.
* The posted information is stored in several categoried files.
* Unrecognized category would be reported as 'not supported'.
