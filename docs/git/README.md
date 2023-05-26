# Git实用指令

## 常用指令

### 初始化分支

```sh
git init
```
初始化项目，包含项目名称、项目创建人、描述、版本、License等，初始化完成后在根目录自动生成package.json文件用于项目的包管理文件，以及.git目录用于记录文件修改以使git进行差异化比对。

### 查看分支

- 查看分支列表
```sh
git branch
```
- 查看当前分支
> 包含当前所在分支名，当前分支下的修改
```sh
git status
```
- 查看当前分支提交记录
```sh
git log
```
- 查看HEAD分支切换记录
```sh
git reflog
```

### 创建分支

- 创建新分支
```sh
git branch <新分支名>
```
- 从现有来源创建新分支
```sh
# 在当前分支下，从当前分支创建新分支
git checkout -b <新分支名>
# 在任意分支下，从指定分支创建新分支
git checkout -b <新分支名> origin/<现有分支名>
```

### 切换分支

- 切换分支
```sh
# 本地找不到该分支，则会将远程分支拷贝到本地
git checkout <分支名>
```

### 删除分支

- 删除分支
```sh
git branch (-d | --delete) [origin] <删除分支名>
```
- 强制删除分支（-d指令无法删除情况，无视警告）
```sh
git branch (-D | --delete --force) [origin] <删除分支名>
```

### 同步分支

- 拉取
```sh
# 自用合并，相当于fetch + merge
git pull [remote <远程分支名>]
```
- 抓取
```sh
# 不会自动同步到本地分支，需要手动拉取
git fetch [--all] [remote <远程分支名>]
```
- 修剪
> 一般用于远程分支被删除、被重命名等无法找到git实例的情况
```sh
git prune
# 等价
git fetch --prune
```

### 缓存分支

当你想要在提交前先拉取代码，又不想自己修改的代码被自动合并的代码覆盖，就先将当前所有修改暂存，此时所有修改会存入缓存（在当前分支下的修改记录被移除，不用担心，之后会还原到此分支），拉取代码后弹出缓存中的修改（会覆盖拉取代码）。

- 缓存
```sh
# 将在当前分支所做的所有修改保存入栈中
git stash
```
- 弹出
```sh
# 将位于顶部的缓存弹出并应用于当前分支，弹出后将会从栈顶移除
git stash pop
```
- 清除
```sh
# 清除无用的/过时的缓存
git stash clear
```

### 合并分支

- 合并
```sh
# 在当前分支下，将其他分支合并到当前分支
git merge <分支名>
```

### 暂存分支

- 暂存
```sh
# 暂存当前分支下所有操作
git add .
```

### 提交分支

- 提交
```sh
# 为此次提交撰写描述（必须）
git commit -m "提交描述"
```

### 推送分支

- 推送
```sh
# 推送HEAD到远程分支，或者将HEAD推送到指定远程分支
git push [origin <分支名>] [-f | --force]
```

### 回退分支

- 重置
```sh
# 将HEAD重置到指定提交SHA，适用于非保护分支，且需要配合实用强制推送指令。不会生成一次新的提交记录，而是直接将提交回溯到之前某一时刻的提交。
# 如果是多人合作项目，需要项目每一个参与者都执行本地分支回退
git reset <SHA> [--hard | --soft]
```
- 反转
```sh
# -m 数字（从左到右从1开始），是针对merge提交点的操作
git revert <sha> [-m index]
```

### 拷贝分支

- 拷贝
```sh
# 拷贝某次提交到当前分支
git cherry-pick <SHA>
```

## 常用场景

### 提交代码过程

```sh
git add .
git commit -m "此次提交说明"
# 推送前需要拉去一次远程代码，避免因与远程分支有修改相同地方产生冲突导致推送失败
git pull
git push
```

### 合并分支过程

```sh
# 建议合并前先同步一下分支
git pull
git merge 分支名
# 若有冲突（分支名|MERGING），则处理冲突
# 冲突处理完成后
git add .
git commit -m "合并冲突说明"
git push
```

### 分支重命名过程
> 如果遇到项目分支名变更到另一个分支名
```sh
# 重命名本地分支
# （在当前分支）
git branch -m <新分支名>
# （不在当前分支）
git branch -m <旧分支名> <新分支名>
# 删除远程分支
git push --delete origin <旧分支名>
# 推送新命名的分支到远程Git
git push origin <新分支名>
# 关联修改后的本地分支与远程分支
git branch --set-upstream-to=origin/<远程分支> [本地分支]
```

### 分支回退过程
> 项目分支出现严重纰漏必须回退
```sh
# 获取到目的SHA
git log

# 方式一：reset 直接删除SHA之后的提交（）
git reset <SHA> --hard
# 推送后，所有项目成员都需要将此分支所在本地分支手动回退
git push origin -f

# 方式二：revert 新建一次提交，使SHA之后的提交全部失效（但不会删除）。如果之后需要使此次revert操作失效（即将失效部分状态反转为生效），可将revert的SHA再次执行反转操作。
git revert <SHA>
git commit -m "revert SHA <SHA>"
git push
```

### 将A分支上AA次提交应用到B分支
> 在错误的分支上进行了修改并提交，需要将它拷贝到并应用到正确分支（错误分支上的修改并不会被删除，仅是对其复制）
```sh
# 在A分支获取到AA提交记录SHA
git log
# 在B分支
git cherry-pick <SHA>
# 处理冲突（若有）
git push
```

### 修改提交注释
> 注释写错/不适用于此次修改
```sh
# 1.修改最后一次提交注释（HEAD）
git commit --amend
# 此时会打印出此次提交信息，键盘键入“i”键启用vim编辑模式，修改备注，完成后键盘键入“ESC”键退出vim编辑模式，键盘键入“:”键输入“wq”保存修改并退出
# 后将本地修改同步到远程分支
git push -f origin <分支名>

# 2.修改非最后一次提交注释
# HEAD~后输入想要查询倒数N次提交结果，返回结果每一行为一次提交记录
git rebase -i HEAD~<倒数第N次提交>
# 键盘键入“i”键启用vim编辑模式，在想要修改的那一次提交（行）前，将“pick”修改为“edit”，可同时修改多个
# 完成后键盘键入“ESC”键退出vim编辑模式，键盘键入“:”键输入“wq”保存修改并退出
# 终端会提示你输入“git commit --amend”或者“git rebase --continue”，按照提示输入
# 修改提交注释
git commit --amend
# 键盘键入“i”键启用vim编辑模式，修改备注，完成后键盘键入“ESC”键退出vim编辑模式，键盘键入“:”键输入“wq”保存修改并退出，完成后输入：
git rebase --continue
# 如果是修改多条，会提示当前进度（1/N），分支名也会变成“你的分支名|REBASE-i 1/N”
# 如果所有需要修改的提交全都修改完毕则终端会提示“Successfully rebased and updated refs/heads/你的分支名”，并且分支名后的“|REBASE-i 1/N”会消失
# 后将本地修改同步到远程分支
git push -f origin <分支名>
```