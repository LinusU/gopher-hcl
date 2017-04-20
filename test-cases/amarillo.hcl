group "ntp" {
  task "Install ntp" {
    module = "@amarillo/apt"

    name = "ntp"
    state = "present"
  }

  task "Configure ntp file" {
    module = "@amarillo/template"

    source = "ntp.conf.j2"
    destination = "/etc/ntp.conf"
  }

  task "Start the ntp service" {
    module = "@amarillo/systemd"

    name = "ntp"
    state = "started"
    enabled = true
  }
}

group "httpd" {
  task "Install dependencies" {
    module = "@amarillo/apt"

    name = "${item}"
    state = "present"

    with_items = [
      "httpd",
      "php",
      "php-mysql",
      "git"
    ]
  }

  task "Insert iptables rule for httpd" {
    module = "@amarillo/line-in-file"

    destination = "/etc/sysconfig/iptables"
    create = true
    state = "present"
    regexp = "${httpd_port}"
    insertafter = "^:OUTPUT "
    line = "-A INPUT -p tcp  --dport ${httpd_port} -j  ACCEPT"
  }

  task "Http service state" {
    module = "@amarillo/systemd"

    name = "httpd"
    state = "started"
    enabled = true
  }
}

group "Copy code" {
  task "Copy the code from repository" {
    module = "@amarillo/git"

    repository = "${repository}"
    destination = "/var/www/html/"
  }

  task "Create the index.php file" {
    module = "@amarillo/template"

    src = "index.php.j2"
    dest = "/var/www/html/index.php"
  }
}
